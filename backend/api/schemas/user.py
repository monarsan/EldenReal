from pydantic import BaseModel
from typing import Optional

class CreateUser(BaseModel):
    name: str

class UpdateUser(BaseModel):
    name: str
