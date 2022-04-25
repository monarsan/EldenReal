from sqlalchemy import Column, Integer, String, ForeignKey, BigInteger, DateTime, Float
from db import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    twitter_id = Column(BigInteger)
    name = Column(String(255))
    create_at = Column(DateTime)
