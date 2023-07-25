
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session

from pydantic import BaseModel
import uuid
from fastapi.encoders import jsonable_encoder

from DB.database import Base, engine

'''
engine = create_engine(
    f'mysql+mysqldb://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}',
    echo=True
)
'''

class User(Base):
    __tablename__ = 'users'
    id = Column(String(120), primary_key=True, default=lambda : str(uuid.uuid4()))
    password = Column(String(20), nullable=False)
    #likes = relationship('like.Like', back_populates='user')
    # user_weight = relationship('UserWeight', uselist=False, back_populates='users')
 #   diary = relationship('Diary', back_populates='user')
    name = Column(String(20), nullable=False, unique=True)
    
#Base.metadata.create_all(bind=engine)
    

class CreateRequest(BaseModel):
    name : str
    password : str

def create_user(request: CreateRequest, db: Session):
    b_result = True
    try :
        new_user = User(password=request.password, name=request.name)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except:
        b_result = False
    return b_result

def get_user_id(user_name, db: Session):
    user = db.query(User).filter(User.name==user_name).first()
    return user.id

def get_user_likes(user_name, db: Session):
    user = db.query(User).filter(User.name==user_name).first()
    return user.likes


def get_users_all(db : Session):
    db_all = db.query(User).offset(0).limit(100).all()
    data = jsonable_encoder(db_all)
    print(data)
    return db_all

def get_user_exist(db : Session, name : str, password : str):
    result = db.query(User).filter_by(name = name, password = password).first()
    return result

user_name = ""
