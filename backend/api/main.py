from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware
from db import get_db, Base, engine
import db_init
import auth.twi_auth
from crud import fixed_form, popup, comment, user
import proxy
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

app.include_router(fixed_form.router)
app.include_router(popup.router)
app.include_router(comment.router)
app.include_router(db_init.router)
app.include_router(db_init.router)
app.include_router(db_init.router)
app.include_router(user.router)
app.include_router(auth.twi_auth.router)
app.include_router(proxy.router)