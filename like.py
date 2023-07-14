from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import exists
from mysql_config import USER, PASSWORD, HOST, PORT, DB
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
import uuid
import user
import music
import datetime
import pytz
from base import Base

engine = create_engine(
    f'mysql+mysqldb://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}',
    echo=True
)

class Like(Base):
    __tablename__ = 'likes'
    id = Column(String(120), primary_key=True, default=lambda : str(uuid.uuid4()))
    user_id = Column(String(120), ForeignKey('users.id'))
    user = relationship('user.User', back_populates='likes')
    music = relationship('music.Music', back_populates='likes')
    status = Column(Boolean, default=True, nullable=False)
    music_id = Column(Integer, ForeignKey('musics.id'))
    like_date = Column(DateTime, nullable=False, default=lambda: datetime.datetime.now(pytz.timezone('Asia/Seoul')))

Base.metadata.create_all(bind=engine)

class LikeRequest(BaseModel):
    user_name : str
    music_name : str

def check_like(request: LikeRequest, db: Session):
    user_id = user.get_user_id(request.user_name, db)
    music_id = music.get_music_id(request.music_name, db)
    like = db.query(Like).filter_by(user_id=user_id, music_id=music_id).first()
    if like:
        return True, user_id, music_id
    else:
        return False, user_id, music_id
    
def create_like(user_id, music_id, db: Session):
    new_like = Like(user_id=user_id, music_id=music_id)
    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    return new_like

def change_like(user_id, music_id, db: Session):
    like = db.query(Like).filter_by(user_id=user_id, music_id=music_id).first()
    like.status = not like.status
    db.commit()
    db.refresh(like)
    return like
