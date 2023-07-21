from ytmusicapi import YTMusic
#import streamlit as st
#import pandas as pd
#import numpy as np 


def load_youtube(artist, name):
    yt = YTMusic('oauth.json')
    search_results = yt.search(artist +'의'+ name)
    video_SD = "https://www.youtube.com/watch?v="+search_results[0]['videoId']
    
    return video_SD


video_sd = load_youtube('iu','좋은 날')


