from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser
from IPython.display import YouTubeVideo

DEVELOPER_KEY = 'AIzaSyDvoocMqgF3xxDHjklcX9mUkVK6Y9dCGEM'
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,developerKey=DEVELOPER_KEY)


def load_youtube(artist, name):
    search_response = youtube.search().list(
        q = artist + name,
        part = "snippet",
        maxResults = 1
        ).execute()

    for item in search_response["items"]:
        video_id = item["id"]["videoId"]
        video_SD = "https://www.youtube.com/watch?v="+video_id
    
    return video_SD

