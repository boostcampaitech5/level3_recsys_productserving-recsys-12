from ytmusicapi import YTMusic

def load_youtube(artist, name):
    yt = YTMusic('E:/Python_Workspace/Web/WebProject/react-fastapi/fastapi/youtube/oauth.json')#yt = YTMusic('oauth.json')
    search_results = yt.search(artist +'의'+ name)
    print(search_results)
    video_SD = "https://www.youtube.com/watch?v="+search_results[0]['videoId']
    return search_results[0]['videoId']