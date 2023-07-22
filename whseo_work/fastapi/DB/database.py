from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from DB.postgresql_config import P_USER, P_PASSWORD, P_HOST, P_PORT, P_DB
from DB.mysql_config import USER, PASSWORD, HOST, PORT, DB


SQLALCHEMY_DATABASE_URL = f'postgresql://{P_USER}:{P_PASSWORD}@{P_HOST}:{P_PORT}/{P_DB}'
SQLALCHEMY_MYSQL_URL =   f'mysql+mysqldb://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}'

engine = create_engine(SQLALCHEMY_DATABASE_URL)
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    print("get_db start")
    db = sessionLocal()
    try:
        yield db
        print("get_db success")
    except:
        print("get_db except")
        db.close()
        