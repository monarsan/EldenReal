from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TwitterToken(BaseModel):
    oauth_token: str
    oauth_verifier: str

class RefreshToken(BaseModel):
    refresh_token: str