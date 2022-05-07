import models.popup
from fastapi import APIRouter, HTTPException, Depends, status
from schemas.popup import PopupCreate
from crud.util import add_db
from db import get_db

router = APIRouter()

@router.post("/api/popup/create")
def create_popup(popup: PopupCreate, db = Depends(get_db)):
    popup_obj = models.popup.Popup(
        ok_good = popup.ok_good
    )
    add_db(db, popup_obj)
    return popup_obj


@router.get("/api/popup/{id}")
def get_popup_by_id(id:int, db = Depends(get_db)):
    db_popup_by_id = db.query(models.popup.Popup).filter(models.popup.Popup.id == id).first()
    if db_popup_by_id is None:
        raise HTTPException(status_code = 404, detail = "popup not found")
    return db_popup_by_id