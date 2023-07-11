import streamlit as st
import pandas as pd
import numpy as np 
import os
from test_pipeline import load_model, predict
from model import cosine_sim_output

tokenizer, model = load_model()

st.title('음악 추천 서비스')

user_input = st.text_area('사용자의 글을 입력하세요.')

if st.button('분석'):
    analysis_result = predict(user_input, tokenizer, model)

    if analysis_result:
        name, artist = cosine_sim_output(analysis_result)
        st.success(f'{art}의{name}을 추천합니다!')
      
    else:
        st.warning('분석 결과를 찾을 수 없습니다.')
