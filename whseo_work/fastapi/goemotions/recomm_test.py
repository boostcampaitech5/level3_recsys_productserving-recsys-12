from service import emotion_cos_recommendation

user_input = "행복한 겨울 밤"
artist, title = emotion_cos_recommendation(user_input=user_input)
print(artist, title)