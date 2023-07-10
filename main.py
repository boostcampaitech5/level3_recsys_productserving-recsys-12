from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from mysql_config import USER, PASSWORD, HOST, PORT, DB
from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base
from user import User
from like import Like
import MySQLdb

app = FastAPI()
Base = declarative_base()

engine = create_engine(
    f'mysql+mysqldb://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}',
    echo=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class UserCreate(BaseModel):
    id : str
    name: str
    password : str

class LikeCreate(BaseModel):
    status: bool
    user_id: str

@app.post("/users/")
def create_user(user : UserCreate):
    db = SessionLocal()
    new_user = User(id=user.id, password=user.password ,name=user.name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/likes/")
def create_post(like):
    db = SessionLocal()
    user = db.query(User).filter(User.id == like.user_id).first()
    if not user:
        return {"error": "User not found"}
    new_like = Like(status=like.status, user_id=like.user_id)
    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    return new_like

@app.get("/")
async def root():
    return {"message": "Hello, World!"}
