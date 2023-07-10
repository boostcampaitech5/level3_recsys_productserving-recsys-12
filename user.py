from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from mysql_config import USER, PASSWORD, HOST, PORT, DB
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

engine = create_engine(
    f'mysql+mysqldb://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}',
    echo=True
)

class User(Base):
    __tablename__ = 'users'
    id = Column(String(120), primary_key=True, default=lambda: str(uuid.uuid4()))
    password = Column(String(20), nullable=False)
    # likes = relationship('likes', back_populates='users')
    # user_weight = relationship('UserWeight', uselist=False, back_populates='users')
    name = Column(String(20), nullable=False)

Base.metadata.create_all(bind=engine)