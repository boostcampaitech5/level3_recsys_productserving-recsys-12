![KakaoTalk_20230727_180402095]()
<br></br>

## 1. Introduction

### “오늘 당신에게 딱 맞는 음악을 추천 해 드립니다.”


![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/blob/main/Data/image/Intro.png)
<div align='center'>
      DiaryVibes는 사용자 일기의 감정을 분석하여 
      <u>그 날의 감정</u>
      에 따라 노래를 추천 해 줍니다.

일기 작성 후, 추천 버튼을 누르면 오늘 나와 맞는 **세 곡의 노래**를 바로 들을 수 있습니다.

</div>
<br></br>


**Web Service**
![ser](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/blob/main/Data/image/service.png)
- 일기 감정 분석 → 노래 추천
- 일기 및 추천 노래 저장
- 사용자 계정 관리

<br></br>
## 2. Background
- 기존의 취향 분석 기반 음악 추천 + 감정에 따른 음악 추천 서비스 고안

기존 서비스는 사용자의 청취 이력을 토대로 취향을 분석하여 음악을 추천합니다.

하지만 ‘슬플 때 듣는 플레이리스트’, ‘행복할 때 듣는 플레이리스트’와 같이 그 때의 기분에 따라 음악을 듣고 싶을 때도 있습니다. 

이러한 생각을 바탕으로 그 날의 감정에 따라 노래를 추천해주는 서비스인 ‘DiaryVibes’를 기획하게 되었습니다.
<br></br><br></br>
## 3. Demonstration

**서비스 시연 영상**
<br></br>
![시연](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/blob/main/Data/image/service2.gif)

<br></br>
## 4. Recommender System
**Dataset**
- Crawling - Bugs Dataset (Emotion Labeled Music)
- Melon Dataset - KAKAO AREA
<br></br>
**모델 Architecture**
<br></br>
![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/blob/main/Data/image/modeling.png)
<br></br>
## 5. Product Serving
**Service Architecture**
<br></br>
![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/blob/main/Data/image/architecture.png)
- Frontend - React, Next.js
- Backend - Fastapi, Python, Pytorch, SQLAlchemy
- DB
    - MYSql  
        유저 정보, 다이어리 정보, 추천된 음악 리스트, 좋아요 누른 음악 리스트를 저장하여 유저 피드백에 사용될 수 있도록 구현하였습니다.     
- Docker
    - Frontend docker image : [codenee/frontend-web](https://hub.docker.com/repository/docker/codenee/frontend-web/general)
    - Backend docker image : [codenee/backend-api](https://hub.docker.com/repository/docker/codenee/backend-api/general)
    
    React와 Fastapi로 구현한 웹 페이지를 각각 도커 이미지로 만들어 도커 허브에 업로드하였습니다. docker-compose를 통해 배포할 수 있도록 하였습니다.
  <br></br>
## 6. Follow-up development

**Music Dataset**
<br></br>
![후속1](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/blob/main/Data/image/followup1.png)

- 기존에는 앨범 소개를 바탕으로 노래의 감정 분석을 하였다면 노래 별 가사의 감정을 분석하여 노래마다 감정분석 정확도를 높일 예정입니다. 

**Song2Vec**
<br></br>
![후속2](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/blob/main/Data/image/followup2.png)
- song2vec은 word2vec을 기반으로 하여, 단어 대신 플레이리스트의 '문맥'을 학습한 다음, 가장 비슷한 패턴을 파악해서 추천을 하게 됩니다. 결국 플레이리스트의 순서와 범위 등에 영향을 미치고, 장르, 년도, 감정 등 외부적인 요소는 전혀 고려되지 않습니다. 따라서 다양한 추가데이터로서 장르, 감정, 유저 피드백 등을 고려한 협업 필터링 추천 시스템으로 발전시킬 예정입니다.
<br></br>  <br></br>  <br></br>
## Reference

- [GoEmotions-Korean](https://github.com/monologg/GoEmotions-Korean)
- [Streamlit](https://github.com/streamlit/streamlit)
- [ALS 참고](https://medium.com/radon-dev/als-implicit-collaborative-filtering-5ed653ba39fe)
- [발표영상 보러가기!](https://youtu.be/oZ4JbhP2rnM)
<br></br><br></br><br></br>
**🕵️Members🕵️**

![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/5fc29983-bb40-493d-b611-64fa46566b20)

