from sqlalchemy import Column, Integer, String, ForeignKey, BigInteger, DateTime, Float
from db import Base

class Popup(Base):
    __tablename__ = 'popups'
    id = Column(Integer, primary_key=True, autoincrement=True)
    ok_good = Column(Integer)