from ytmusicapi import YTMusic

def load_youtube(artist, name):
    yt = YTMusic('oauth.json')
    search_results = yt.search(artist +'의'+ name)
    video_SD = "https://www.youtube.com/watch?v="+search_results[0]['videoId']
    
    return video_SD