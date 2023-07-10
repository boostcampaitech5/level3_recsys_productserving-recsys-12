from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime
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

class Like(Base):
    __tablename__ = 'likes'
    id = Column(String(120), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(120), ForeignKey('users.id'))
    user = relationship('users', back_populates='likes')
    status = Column(Boolean, default=False, nullable=False)
    # music = 
    # like_date = 
    
# Base.metadata.create_all(bind=engine)