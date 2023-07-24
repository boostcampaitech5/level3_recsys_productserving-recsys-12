
from sqlalchemy import Column, String, ForeignKey, Integer, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session

from pydantic import BaseModel
import uuid
from fastapi.encoders import jsonable_encoder

from DB.database import Base

class Like(Base):
    __tablename__ = 'likemusic'
    id = Column(String(120), primary_key=True, default=lambda : str(uuid.uuid4()))
    uname = Column(String(20))
    artist = Column(String(100), nullable=False)
    title = Column(String(100), nullable = False)
    status = Column(Boolean, default=False, nullable=False)

class likeRequest(BaseModel):
    artist : str
    title : str
    name : str
    
def check_like(request: likeRequest, db: Session):
    print("user name : " , request.name)
    result = db.query(Like).filter_by(artist=request.artist, title=request.title).first()
    if result:
        return True, request.name, request.artist, request.title
    else:
        return False, request.name, request.artist, request.title
    

def create_like(db : Session, u_name, artist, title):
    print("user name : ", u_name)
    new_like = Like(uname = u_name, artist=artist, title=title, status=True)
    result = True
    try:
        db.add(new_like)
        db.commit()
        db.refresh(new_like)    
    except:
        not result
    
    return result

def change_like(db: Session, u_name, artist, title):
    print("user name : ", u_name)
    like = db.query(Like).filter_by(uname=u_name, artist=artist, title=title).first()
    like.status = not like.status
    db.commit()
    db.refresh(like)
    return like