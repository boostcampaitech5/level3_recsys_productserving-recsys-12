from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from mysql_config import USER, PASSWORD, HOST, PORT, DB
from pydantic import BaseModel
import uuid
import user
import datetime
import pytz
from base import Base

engine = create_engine(
    f'mysql+mysqldb://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}',
    echo=True
)

class Diary(Base):
    __tablename__ = 'diaries'
    id = Column(String(120), primary_key=True, default=lambda : str(uuid.uuid4()))
    user_id = Column(String(120), ForeignKey('users.id'))
    user = relationship('user.User', back_populates='diaries')
    content = Column(String(100), nullable=False)
    write_date = Column(DateTime, nullable=False, default=lambda: datetime.datetime.now(pytz.timezone('Asia/Seoul')))

Base.metadata.create_all(bind=engine)

class DiaryRequest(BaseModel):
    user_name : str
    content : str
    
def create_diary(request: DiaryRequest, db: Session):
    new_diary = Diary(user_id=user.get_user_id(request.user_name, db), content=request.content)
    db.add(new_diary)
    db.commit()
    db.refresh(new_diary)
    return new_diary
