from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from mysql_config import USER, PASSWORD, HOST, PORT, DB
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
import uuid
from base import Base

# Base = declarative_base()

engine = create_engine(
    f'mysql+mysqldb://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}',
    echo=True
)

class User(Base):
    __tablename__ = 'users'
    id = Column(String(120), primary_key=True, default=lambda: str(uuid.uuid4()))
    password = Column(String(20), nullable=False)
    likes = relationship('like.Like', back_populates='user')
    # user_weight = relationship('UserWeight', uselist=False, back_populates='users')
    name = Column(String(20), nullable=False, unique=True)
    
Base.metadata.create_all(bind=engine)

class CreateRequest(BaseModel):
    id : str
    password : str
    name : str

def create_user(request: CreateRequest, db: Session):
    new_user = User(id=request.id, password=request.password, name=request.name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_user_id(user_name, db: Session):
    user = db.query(User).filter(User.name==user_name).first()
    return user.id
    

# Base.metadata.create_all(bind=engine)