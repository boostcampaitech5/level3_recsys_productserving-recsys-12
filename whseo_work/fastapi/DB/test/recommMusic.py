
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session

from pydantic import BaseModel
import uuid
import datetime, pytz
#from fastapi.encoders import jsonable_encoder
from DB.database import Base, engine
from DB.test.user import get_user_id

class RecommMusic(Base):
    __tablename__ = 'recomm_music'
    id = Column(String(120), primary_key=True, default=lambda : str(uuid.uuid4()))
    user_id = Column(String(120), ForeignKey('users.id'), nullable=False)
    artist = Column(String(30), nullable=False)
    title = Column(String(30), nullable=False)
    create_date = Column(DateTime, nullable=False, default=lambda: datetime.datetime.now(pytz.timezone('Asia/Seoul')))

#Base.metadata.create_all(bind=engine)

class recommRequest(BaseModel):
    user_name : str


def create_recomm_music(db: Session, user_id, artist, title):
    #user_id = get_user_id(user_name, db)
    b_result = True
    try:
        new_recomm = RecommMusic(user_id = user_id, artist = artist, title = title)
        db.add(new_recomm)
        db.commit()
        db.refresh(new_recomm)
    except:
        b_result = False
    print(artist, title, b_result)
    return b_result

def get_recomm_musics(db: Session, uname : str):
    user_id = get_user_id(user_name=uname, db=db)
    try:
        db = db.query(RecommMusic).filter_by(user_id = user_id).offset(0).limit(5).all()
    except:
        return {"status" : "DB FAIL"}
    print(db)
    #data = jsonable_encoder(db)
    return db


def save_musicList(db: Session, user_name, musciList):
    user_id = get_user_id(user_name, db)
    result = True
    for i in range(len(musciList)):
        b_result = create_recomm_music(db, user_id=user_id, artist=musciList[i][0], title=musciList[i][1])
        if not b_result:
            result = False
    return result        
    
