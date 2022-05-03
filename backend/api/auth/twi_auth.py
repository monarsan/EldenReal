from fastapi import APIRouter, HTTPException, Depends, status
from db import get_db
from fastapi.security import OAuth2
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from datetime import timedelta, datetime

import auth.twi_util
from schemas.auth import *
from config import *
import crud.user

router = APIRouter()
oauth2_scheme = OAuth2()

def twitter_authenticate(token: TwitterToken):
    twitter_id = auth.twi_util.verify_oauth_token(token.oauth_token, token.oauth_verifier)
    if twitter_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return twitter_id

def check_access_token(token: str = Depends(oauth2_scheme)):
    token = token.split(" ")[1]
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        twitter_id: str = payload.get("twitter_id")
        if twitter_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    if payload.get("type" != "access"):
        raise credentials_exception
    return twitter_id

def check_refresh_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        twitter_id: str = payload.get("twitter_id")
        if twitter_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    if payload.get("type" != "refresh"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return twitter_id

def generate_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt

@router.post("/api/token", response_model=Token)
def give_token(id = Depends(twitter_authenticate), db: Session = Depends(get_db)):
    if crud.user.get_user_by_twitter_id(db, id) is None:
        crud.user.create(db, id)
    access_token = generate_token({"twitter_id": id, "type": "access"}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = generate_token({"twitter_id": id, "type": "refresh"}, timedelta(days=REFLESH_TOKEN_EXPIRE_DAYS))
    return Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer")

@router.post("/api/refresh", response_model=Token)
def reflesh_token(refresh_token : RefreshToken):
    id = check_refresh_token(refresh_token.refresh_token)
    new_access_token = generate_token({"twitter_id": id, "type": "access"}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    new_refresh_token = generate_token({"twitter_id": id, "type": "refresh"}, timedelta(days=REFLESH_TOKEN_EXPIRE_DAYS))
    return Token(access_token=new_access_token, refresh_token=new_refresh_token, token_type="bearer")

@router.get("/api/generate_url")
def generate_url():
    return auth.twi_util.generate_authenticate_url()

@router.get("/api/get_user_name")
def get_user_name(id = Depends(check_access_token), db: Session = Depends(get_db)):
    user = crud.user.get_user_by_twitter_id(db, id)
    return user.name

@router.get("/api/get_profile_image_url")
def get_user_name(id = Depends(check_access_token), db: Session = Depends(get_db)):
    return auth.twi_util.get_twitter_profile_image_url(id)