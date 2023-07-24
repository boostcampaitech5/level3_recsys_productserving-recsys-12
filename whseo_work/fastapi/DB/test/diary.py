
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session
import datetime
import pytz
from pydantic import BaseModel
import uuid
from fastapi.encoders import jsonable_encoder

from DB.database import Base
from DB.test.user import get_user_id

class Diary(Base):
    __tablename__ = 'diary'
    id = id = Column(String(120), primary_key=True, default=lambda : str(uuid.uuid4()))
    user_id = Column(String(120), ForeignKey('users.id'))
  #  user = relationship('User', back_populates='diary')
    content = Column(String(300), nullable=False)
    write_date = Column(DateTime, nullable=False, default=lambda: datetime.datetime.now(pytz.timezone('Asia/Seoul')))

class dirayRequest(BaseModel):
    user_name : str
    content : str
    
def create_diary(db: Session, request : dirayRequest):
    #new_diary = Diary(user_id=get_user_id(request.user_name, db=db), content=request.content)
    user_id = get_user_id(request.user_name, db)
    print(user_id)
    new_diary = Diary(user_id=user_id, content=request.content)
    result = True
    try:
        db.add(new_diary)
        db.commit()
        db.refresh(new_diary)
    except:
        not result
    return result