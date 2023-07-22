from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session
from DB.database import Base, engine, get_db
from fastapi import Depends

import uuid

class User(Base):
    __tablename__ = 'users_'
    id = Column(String(120), primary_key=True, default=lambda : str(uuid.uuid4()))
    password = Column(String(20), nullable=False)
    #likes = relationship('like.Like', back_populates='user')
    # user_weight = relationship('UserWeight', uselist=False, back_populates='users')
    name = Column(String(20), nullable=False, unique=True)
    
#Base.metadata.create_all(bind=engine)
