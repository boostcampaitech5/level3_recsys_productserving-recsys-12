
## 1. Introduction



### “오늘 당신에게 딱 맞는 음악을 추천 해 드립니다.”

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a5e3616-2d92-4366-bd10-ea65d10ede0b/Untitled.png)

DiaryVibes는 사용자 일기의 감정을 분석하여 **그 날의 감정**에 따른 노래를 추천 해 줍니다.

일기 작성 후, 추천 버튼을 누르면 오늘 나와 맞는 **세 곡의 노래**를 바로 들을 수 있습니다.

**Project Objective**

- 일기 감정 분석 → 노래 추천
- 일기 및 추천 노래 저장
- 사용자 계정 관리

### background

기존 서비스는 사용자의 청취 이력을 토대로 취향을 분석하여 음악을 추천합니다.

하지만 ‘슬플 때 듣는 플레이리스트’, ‘행복할 때 듣는 플레이리스트’와 같이 그 때의 기분에 따라 음악을 듣고 싶을 때도 있습니다. 이러한 생각을 바탕으로 그 날의 감정에 따라 노래를 추천해주는 서비스인 ‘DiaryVibes’를 기획하게 되었습니다.

## 2. Demonstration

---

**서비스 시연 영상**

**서비스 제한 사항**

## 3. Service Architecture

---

**서비스 흐름**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f12395b1-9c89-43c8-b84b-c216cf1502ea/Untitled.png)

**모델 흐름**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f44cd400-28f8-451d-a10d-158db60473bd/Untitled.png)

---

**🕵️Members🕵️**

|         권수현(T5016) |         서우현(T5106) |         이원섭(T5146) |         정상혁(T5191) |
| --- | --- | --- | --- |

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/74cb86ef-d045-4d2c-a0d5-3b9fbfb126c8/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e171579e-54cc-445b-b007-86acaad59a3f/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6f8e9a07-9b4a-404c-92d0-3aee3bbd8041/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/16073700-c5fd-40aa-8d0e-58bff4df253a/Untitled.png)

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
