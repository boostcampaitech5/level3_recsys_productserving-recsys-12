
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session

from pydantic import BaseModel
import uuid
from fastapi.encoders import jsonable_encoder

from DB.database import Base, engine

class Config(BaseModel):
    text : str
