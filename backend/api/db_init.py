from fastapi import APIRouter, Depends
from db import get_db, Base, engine
import models.comment, models.popup, models.user, models.fixed_form

router = APIRouter()

@router.get("/init/db")
def init_db(db = Depends(get_db)):
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    return "database initialized"

if __name__ == "__main__":
    print(Base.metadata.tables)
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("DB initialized")