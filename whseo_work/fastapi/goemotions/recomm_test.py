from service import emotion_cos_recommendation

user_input = "행복한 겨울 밤"
result = emotion_cos_recommendation(user_input=user_input)
print(result)
print(type(result))