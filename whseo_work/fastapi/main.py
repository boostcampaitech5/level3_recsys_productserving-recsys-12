from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from fastapi.encoders import jsonable_encoder

from goemotions.service import emotion_cos_recommendation, test_emotion_cos_recommendation
from DB.database import sessionLocal
from DB.test.user import get_users_all, CreateRequest, get_user_exist, create_user
from youtube.youtube import load_youtube
from DB.test.recommMusic import save_musicList, get_recomm_musics, check_recomm_musics
from DB.test.like import likeRequest, check_like, change_like, create_like
from DB.test.text import Config
from DB.test.diary import dirayRequest, create_diary

#from mymodels.user import User


app = FastAPI()

origins = [
    'http://localhost:3000'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"], #origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/")
async def root():
    return {"fastapi-react link success"}#{"message" : "root"}


@app.post(path = "/api/recomm_music_back")
async def test_input(data : dirayRequest):
    print(data.dict())
    print(data.user_name)
    result = test_emotion_cos_recommendation(data.content)
    print(result)

@app.post(path = "/api/recomm_music")
async def test_input(data : dirayRequest):
    print(data.dict())
    print(data.user_name)
    db = sessionLocal()
    db_result = create_diary(db=db, request=data)
    if not db_result:
        print("SAVE DIRAY DB FAIL")
    result = emotion_cos_recommendation(data.content)
    youtube_url = []
    for i in range(len(result)):
        url = load_youtube(artist=result[i][0], name=result[i][1])
        youtube_url.append(url)

    print(result)
    db_result2 = save_musicList(db=db, user_name=data.user_name, musciList=result)
    
    return {
        "status" : "SUCCESS",
        "musicList" : result,
        "urlList" : youtube_url,
    }

@app.post(path = "/recomm_music_back")
async def test_input_back(data : Config):
    print(data.dict())
    artist, title = emotion_cos_recommendation(data.text)
    youtube_url = ""#load_youtube(artist=artist, name=title)
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
async def get_db_users_all():
    db = sessionLocal()
    return get_users_all(db=db)


@app.post(path="/api/auth/login")
async def auth_login(data : CreateRequest):
    print(data.dict())
    db = sessionLocal()
    result = get_user_exist(db, data.name, data.password)
    print(jsonable_encoder(result))
    result = jsonable_encoder(result)
    if result == None:
        status = "None"
    else:
        status = "SUCCESS"
        user_name = data.name
        print(user_name)
    return{
        "status" : status
    }
    
    
@app.post(path="/api/auth/register")
async def auth_register(data: CreateRequest):
    db = sessionLocal()
    b_result = create_user(request=data, db=db)
    result = "SUCCESS"
    if not b_result:
        result = "FAIL"
    return {
        "status" : result
    }
    

@app.post(path="/api/like")
async def set_like(data : likeRequest):
    print(data.dict())
    
    return {
        "status" : "SUCCESS"
    }
    
@app.post(path="/api/click_like")
async def click_like(data : likeRequest):
    db = sessionLocal()
    exists, u_name, artist, title = check_like(data, db=db)
    result = "FAIL"
    if exists:
        if change_like(db=db, u_name=u_name, artist=artist, title=title):
            result = "SUCCESS"
    else:
        create_like(db=db, u_name=u_name, artist=artist, title=title)
        
    return{
        "status" : result
    }


def save_diary(data : dirayRequest):
    db = sessionLocal()
    b_result = create_diary(db=db, request=data)
    return{
        "status" : b_result
    }
    

@app.get("/api/recomm_musiclist/{username}")
async def get_recomm_musiclist(username):
    db = sessionLocal()
    print(username)
    result = check_recomm_musics(db, username)#get_recomm_musics(db=db, uname=username)
    
    return result