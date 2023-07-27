from ytmusicapi import YTMusic
from .youtube_config import OAUTH_PATH

def load_youtube(artist, name):
    yt = YTMusic(OAUTH_PATH)#yt = YTMusic('oauth.json')
    search_results = yt.search(artist +'의'+ name)
    print(search_results)
    video_SD = "https://www.youtube.com/watch?v="+search_results[0]['videoId']
    return search_results[0]['videoId']