from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE = 'postgresql'
USER = 'admin'
PASSWORD = 'admin'
HOST = 'sql'
PORT = '5432'
DB_NAME = 'db'

DATABASE = '{}://{}:{}@{}:{}/{}'.format(DATABASE, USER, PASSWORD, HOST, PORT, DB_NAME)
engine = create_engine(
    DATABASE,
    encoding="utf-8"
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()