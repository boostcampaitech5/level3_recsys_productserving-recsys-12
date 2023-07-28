import streamlit as st
import pandas as pd
import numpy as np 
import os
from test_pipeline import load_model, predict
from model import cosine_sim_output, manhattan_dis_output
from IPython.display import display
from youtube import load_youtube

tokenizer, model = load_model()

st.title('음악 추천 서비스')

user_input = st.text_area('사용자의 글을 입력하세요.')

if st.button('분석'):
    analysis_result = predict(user_input, tokenizer, model)

    if analysis_result:
        music_result = cosine_sim_output(analysis_result)

        for i in range(3):
            artist = music_result.iloc[i]['artist']
            name = music_result.iloc[i]['title']
        
            st.success(f'{artist}의 {name}을 추천합니다!')
            video_sd = load_youtube(artist, name)
            st.success(st.video(video_sd))
        #emotion = ','.join([e for e in emo])
        #st.success(f'{emotion}의 감정!')
      
    else:
        st.warning('분석 결과를 찾을 수 없습니다.')
    