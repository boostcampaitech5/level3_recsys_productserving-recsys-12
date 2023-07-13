from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from mysql_config import USER, PASSWORD, HOST, PORT, DB
from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base
# from user import User
# from like import Like
from base import Base
import user, like
import uvicorn

app = FastAPI()
Base = declarative_base()

engine = create_engine(
    f'mysql+mysqldb://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}',
    echo=True
)

# SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@app.post("/users/")
def post_new_user(new_user : user.CreateRequest):
    db = SessionLocal()
    return user.create_user(new_user, db)

@app.get("/get_id/{user_name}")
def get_id(user_name):
    db = SessionLocal()
    return user.get_user_id(user_name, db)

@app.post("/likes/")
def post_new_like(new_like : like.CreateRequest):
    db = SessionLocal()
    return like.create_like(new_like, db)

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

if __name__ == "__main__":
    # SessionLocal.configure(bind=engine)
    # Base.metadata.bind = engine
    Base.metadata.create_all(bind=engine)
    uvicorn.run(app)