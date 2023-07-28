from fastapi import Depends
from sqlalchemy.orm import Session

from mymodels.user import User
from DB.database import get_db

def get_users_all(db : Session = Depends(get_db)):
    db_all = db.query(User).offset(0).limit(100).all()
    print("get_users_all success")
    return db_all

