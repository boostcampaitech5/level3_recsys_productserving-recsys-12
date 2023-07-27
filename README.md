
## 1. Introduction



### “오늘 당신에게 딱 맞는 음악을 추천 해 드립니다.”

![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/d9584e7d-6ae1-4a44-9801-2e129c44bc59)
<div align='center'>
      DiaryVibes는 사용자 일기의 감정을 분석하여 **그 날의 감정**에 따른 노래를 추천 해 줍니다.

일기 작성 후, 추천 버튼을 누르면 오늘 나와 맞는 **세 곡의 노래**를 바로 들을 수 있습니다.

</div>

**Project Objective**

- 일기 감정 분석 → 노래 추천
- 일기 및 추천 노래 저장
- 사용자 계정 관리

### background

기존 서비스는 사용자의 청취 이력을 토대로 취향을 분석하여 음악을 추천합니다.

하지만 ‘슬플 때 듣는 플레이리스트’, ‘행복할 때 듣는 플레이리스트’와 같이 그 때의 기분에 따라 음악을 듣고 싶을 때도 있습니다. 이러한 생각을 바탕으로 그 날의 감정에 따라 노래를 추천해주는 서비스인 ‘DiaryVibes’를 기획하게 되었습니다.

## 2. Demonstration


**서비스 시연 영상**

**서비스 제한 사항**

## 3. Service Architecture


**서비스 흐름**

![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/034ff5b7-1b2a-4786-a5c2-088e45778aab)

**모델 흐름**

![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/ebe56ba2-8cea-45e3-a3d8-e35b0de9b881)

---

**🕵️Members🕵️**

|         권수현(T5016) |         서우현(T5106) |         이원섭(T5146) |         정상혁(T5191) |
| --- | --- | --- | --- |

![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/94403941-b015-4d08-bd75-5f2f9670c5dc)

![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/29a83a06-3d04-4217-acd0-b3489eba1c22)
![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/44f554bc-fa6e-40c9-8382-7945abc668d8)
![initial](https://github.com/boostcampaitech5/level3_recsys_productserving-recsys-12/assets/97236643/2c446915-e990-47aa-bdcc-c27417ac9c31)
|              프론트
      데이터 전처리
           모델 설계 |       데이터베이스
            백엔드
            프론트 |          데이터베이스 
            모델 설계
          모델 전처리 |          아이디어 기획
  모델 설계 및 모델 실험
          데이터 전처리 |
| --- | --- | --- | --- |
