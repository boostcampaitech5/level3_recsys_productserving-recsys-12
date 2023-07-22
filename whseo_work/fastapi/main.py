from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, Field
from fastapi.encoders import jsonable_encoder

from goemotions.service import emotion_cos_recommendation
from DB.database import sessionLocal
from DB.test.user import get_users_all, CreateRequest, get_user_exist
from youtube.youtube import load_youtube
from DB.test.recommMusic import get_recomm_musics, RecommRequest, create_recomm_music
#from mymodels.user import User


app = FastAPI()

origins = [
    'http://localhost:3000'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, #["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"fastapi-react link success"}#{"message" : "root"}

class Config(BaseModel):
    text : str


@app.post(path = "/recomm_music")
def test_input_back(data : Config):
    print(data.dict())
    result = emotion_cos_recommendation(data.text)
    youtube_url = []
    for i in range(len(result)):
        url = load_youtube(artist=result[i][0], name=result[i][1])
        youtube_url.append(url)

    print(result)
    return {
        "status" : "SUCCESS",
        "musicList" : result,
        "urlList" : youtube_url,
    }

@app.post(path = "/recomm_music_back")
def test_input_back(data : Config):
    print(data.dict())
    artist, title = emotion_cos_recommendation(data.text)
    youtube_url = load_youtube(artist=artist, name=title)
    print(artist, title, youtube_url)
    return {
        "status" : "SUCCESS",
        "artist" : artist,
        "title" : title,
        "url" : youtube_url,
    }
    #return {"artist" : artist, "title" : title}
    
'''
@app.get(path = "/users_all")
def get_db_users_all(db: Session = Depends(get_db)):
    result = db.query(User).offset(0).limit(100).all()
    data = jsonable_encoder(result)
    print('-----')
    print(data)
    print('------')
    return result
'''

@app.get(path = "/users_all")
def get_db_users_all():
    db = sessionLocal()
    return get_users_all(db=db)


@app.post(path="/auth/login")
def auth_login(data : CreateRequest):
    print(data.dict())
    db = sessionLocal()
    result = get_user_exist(db, data.name, data.password)
    print(jsonable_encoder(result))
    result = jsonable_encoder(result)
    if result == None:
        status = "None"
    else:
        status = "SUCCESS"
    return{
        "status" : status
    }
