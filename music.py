from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from mysql_config import USER, PASSWORD, HOST, PORT, DB
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
import uuid
from base import Base

engine = create_engine(
    f'mysql+mysqldb://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}',
    echo=True
)

class Music(Base):
    __tablename__ = 'musics'
    id = Column(Integer, primary_key=True)
    name = Column(String(30), nullable=False)
    singer = Column(String(20), nullable=False)
    likes = relationship('like.Like', back_populates='music')
    weight = Column(String(100), nullable=False)
    weight_labels = Column(String(300), nullable=False)
    
Base.metadata.create_all(bind=engine)

def get_music_id(music_name, db: Session):
    music = db.query(Music).filter(Music.name==music_name).first()
    return music.id
    
