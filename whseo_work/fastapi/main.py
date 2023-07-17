from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, Field

app = FastAPI()

origins = [
    'http://localhost:3000'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],#origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"fastapi-react link success"}#{"message" : "root"}

class Config(BaseModel):
    text : str

@app.post(path = "/input")
def test_input(data : Config):
    print(data.dict())
    return {"data" : data.text}