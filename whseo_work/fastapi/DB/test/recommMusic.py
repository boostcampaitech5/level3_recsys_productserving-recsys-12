
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session

from pydantic import BaseModel
import uuid
from fastapi.encoders import jsonable_encoder

from DB.database import Base, engine

class RecommMusic(Base):
    __tablename__ = 'recomm_music'
    id = Column(String(120), primary_key=True, default=lambda : str(uuid.uuid4()))
    uname = Column(String(20), nullable=False)
    artist = Column(String(30), nullable=False)
    title = Column(String(30), nullable=False)

#Base.metadata.create_all(bind=engine)

class RecommRequest(BaseModel):
    name : str
    artist : str
    title : str


def create_recomm_music(request: RecommRequest, db: Session):
    new_recomm = RecommMusic(uname = request.name, artist = request.artist, title = request.title)
    db.add(new_recomm)
    db.commit()
    db.refresh(new_recomm)
    return new_recomm

def get_recomm_musics(db: Session, uname : str):
    db = db.query(RecommMusic).filter_by(uname = uname).limit(5)
    data = jsonable_encoder(db)
    return data

