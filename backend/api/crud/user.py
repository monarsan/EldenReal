import models.user
import schemas.user
from fastapi import HTTPException
import auth.twi_util
import datetime

def get_user_by_twitter_id(db, twitter_id) -> models.user.User:
    user = db.query(models.user.User).filter(models.user.User.twitter_id == twitter_id).first()
    return user

def create(db, twitter_id) -> models.user.User:
    if db.query(models.user.User).filter(models.user.User.twitter_id == twitter_id).first() != None:
        raise HTTPException(status_code=400, detail="User already exists")
    new_user = models.user.User(twitter_id=twitter_id, name=auth.twi_util.get_twitter_screen_name(twitter_id), create_at=datetime.datetime.now())
    db.add(new_user)
    db.commit()
    return new_user
