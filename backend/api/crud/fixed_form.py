import models.fixed_form
from fastapi import APIRouter, HTTPException, Depends, status
from schemas.fixed_form import FixedFormCreate
from crud.util import add_db
from db import get_db

router = APIRouter()

@router.post("/api/fixed_form/create")
def create_fixed_form(form: FixedFormCreate, db = Depends(get_db)):
    fixed_form_obj = models.fixed_form.FixedForm(
        content = form.content,
        ok_good = form.ok_good
    )
    add_db(db, fixed_form_obj)
    return fixed_form_obj


@router.get("/api/fixed_form/{id}")
def get_fixed_form_by_id(id:int, db = Depends(get_db)):
    db_fixed_form_by_id = db.query(models.fixed_form.FixedForm).filter(models.fixed_form.FixedForm.id == id).first()
    if db_fixed_form_by_id is None:
        raise HTTPException(status_code = 404, detail = "fixed_form not found")
    return db_fixed_form_by_id


@router.get("/api/fixed_form/")
def get_fixed_forms(db = Depends(get_db)):
    db_fixed_forms = db.query(models.fixed_form.FixedForm).all()
    return db_fixed_forms