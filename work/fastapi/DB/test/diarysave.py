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

class DiarySave(Base):
    __tablename__ = 'diarysave'
    id = id = Column(String(120), primary_key=True, default=lambda : str(uuid.uuid4()))
    user_id = Column(String(120))
    content = Column(String(300), nullable=False)
    write_date = Column(DateTime, default=lambda: datetime.datetime.now(pytz.timezone('Asia/Seoul')))


class diraysaveRequest(BaseModel):
    user_name : str
    content : str
    
def create_diary(db: Session, request : diraysaveRequest):
    user_id = get_user_id(request.user_name, db)
    new_diary = DiarySave(user_id=user_id, content=request.content)
    result = True
    try:
        db.add(new_diary)
        db.commit()
        db.refresh(new_diary)
    except:
        not result
    return result