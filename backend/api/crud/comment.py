import models.comment
import schemas.comment
import datetime
from fastapi import APIRouter, HTTPException, Depends, status
from schemas.comment import CreateComment, DeleteComment
from crud.util import add_db
from db import get_db

router = APIRouter()

@router.post("/api/comment/create")
def create_comment(comment: CreateComment, db=Depends(get_db)):
    comment_obj = models.comment.Comment(
        lat = comment.lat,
        lng = comment.lng,
        good = 0,
        bad = 0,
        fixed_form_id = comment.fixed_form_id,
        fixed_form_content1 = comment.fixed_form_content1,
        fixed_form_content2 = comment.fixed_form_content2,
        popup_id =comment.popup_id,
        create_at = datetime.datetime.now()
    )
    add_db(db, comment_obj)
    return comment_obj


@router.get("/api/comment/{id}")
def get_post_by_id(id:int, db = Depends(get_db)):
    db_comment = db.query(models.comment.Comment).filter(models.comment.Comment.id == id).first()
    if db_comment is None:
        raise HTTPException(status_code = 404, detail = "Comment not found")
    return db_comment


@router.get("/api/comment/neighborhood/")
def get_neighborhood_comment(lat:float, lng:float, db=Depends(get_db)):
    db_neighbor_list = db.query(models.comment.Comment).\
        filter(models.comment.Comment.lat - lat<0.0001, lat - models.comment.Comment.lat<0.0001 ).\
        filter(models.comment.Comment.lng - lng<0.0001, lng - models.comment.Comment.lng<0.0001 ).\
        limit(20).all()
    return db_neighbor_list