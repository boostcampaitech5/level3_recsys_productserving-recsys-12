from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from mysql_config import USER, PASSWORD, HOST, PORT, DB
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
import uuid
import user
from base import Base
# from user import User

# Base = declarative_base()

engine = create_engine(
    f'mysql+mysqldb://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}',
    echo=True
)

class Like(Base):
    __tablename__ = 'likes'
    id = Column(String(120), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(120), ForeignKey('users.id'))
    user = relationship('user.User', back_populates='likes')
    status = Column(Boolean, default=False, nullable=False)
    # music = 
    # like_date = 

Base.metadata.create_all(bind=engine)

class CreateRequest(BaseModel):
    id : str
    status : bool
    user_name : str

def create_like(request: CreateRequest, db: Session):
    user_id = user.get_user_id(request.user_name, db)
    if not user_id:
        return {"error": "User not found"}

    new_like = Like(id=request.id, status=request.status, user_id=user_id)
    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    return new_like
# Base.metadata.create_all(bind=engine)