from sqlalchemy import Column, Integer, String, ForeignKey, BigInteger, DateTime, Float
from db import Base

class FixedForm(Base):
    __tablename__ = 'fixed_forms'
    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(String(255))
    ok_good = Column(Integer)