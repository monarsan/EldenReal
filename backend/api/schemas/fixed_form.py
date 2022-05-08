from pydantic import BaseModel
from typing import Optional

class FixedFormCreate(BaseModel):
    content :str
    ok_good : int
    class Config:
        orm_model = True