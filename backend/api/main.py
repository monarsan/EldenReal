from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware
from db import get_db, Base, engine
import db_init
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/hello")
def hello(db=Depends(get_db)):
    return "Hello World"

app.include_router(db_init.router)