![KakaoTalk_20230727_180402095](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/21667896-4b7f-4117-a3c6-5ff10a899dbe)
<br></br>

## 1. Introduction

### “오늘 당신에게 딱 맞는 음악을 추천 해 드립니다.”

![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/d9584e7d-6ae1-4a44-9801-2e129c44bc59)
<div align='center'>
      DiaryVibes는 사용자 일기의 감정을 분석하여 
      <u>그 날의 감정</u>
      에 따라 노래를 추천 해 줍니다.

일기 작성 후, 추천 버튼을 누르면 오늘 나와 맞는 **세 곡의 노래**를 바로 들을 수 있습니다.

</div>
<br></br>


**Web Service**
![ser](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/502a1a58-b259-48a8-be2d-00605940f1fa)
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
![시연](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/c993fa36-3a42-479c-bdf8-dd1750999cb0)

<br></br>
## 4. Recommender System
**Dataset**
- Crawling - Bugs Dataset (Emotion Labeled Music)
- Melon Dataset - KAKAO AREA
<br></br>
**모델 Architecture**
![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/ebe56ba2-8cea-45e3-a3d8-e35b0de9b881)
<br></br>
## 5. Product Serving
**Service Architecture**
![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/034ff5b7-1b2a-4786-a5c2-088e45778aab)
<br></br>
## Reference

- [GoEmotions-Korean](https://github.com/monologg/GoEmotions-Korean)
- [Streamlit](https://github.com/streamlit/streamlit)
- [ALS 참고](https://medium.com/radon-dev/als-implicit-collaborative-filtering-5ed653ba39fe)
<br></br><br></br><br></br>
**🕵️Members🕵️**

![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/5fc29983-bb40-493d-b611-64fa46566b20)

