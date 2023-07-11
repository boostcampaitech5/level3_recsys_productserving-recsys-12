import streamlit as st
import pandas as pd
import os
from test_pipeline import load_model, predict

data_path = '../../data/'
music_data = pd.read_csv(os.path.join(data_path, 'last_data.csv'))

tokenizer, model = load_model()

st.title('음악 추천 서비스')

user_input = st.text_area('사용자의 글을 입력하세요.')

if st.button('분석'):
    analysis_result = predict(user_input, tokenizer, model)
    
    if analysis_result:
        st.success('분석 결과: {}'.format(analysis_result))
        
        st.subheader('추천 음악')
        recommended_music = music_data[music_data['감정'] == analysis_result]
        st.dataframe(recommended_music)
    else:
        st.warning('분석 결과를 찾을 수 없습니다.')
