from pydantic import BaseModel
from typing import Optional

class CreateComment(BaseModel):
    lat: float
    lng: float
    fixed_form_id: int
    fixed_form_content1: str
    fixed_form_content2: Optional[str]
    popup_id: int

class DeleteComment(BaseModel):
    id: int