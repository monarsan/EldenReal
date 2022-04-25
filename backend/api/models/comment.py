from sqlalchemy import Column, Integer, String, ForeignKey, BigInteger, DateTime, Float 
from db import Base

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    lat = Column(Float)
    lng = Column(Float)
    good = Column(Integer)
    bad = Column(Integer)
    fixed_form_id = Column(Integer, ForeignKey('fixed_forms.id'))
    fixed_form_content1 = Column(String(255))
    fixed_form_content2 = Column(String(255))
    popup_id = Column(Integer, ForeignKey('popups.id'))
    create_at = Column(DateTime)
