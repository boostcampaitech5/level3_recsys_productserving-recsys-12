
from .pipeline import load_model, predict
from .model import cosine_sim_output, manhattan_dis_output

def emotion_cos_recommendation(user_input : str = ""):
    tokenizer, model = load_model()
    analysis_result = predict(user_input, tokenizer, model)
    if analysis_result:
        title, artist, emo = cosine_sim_output(analysis_result=analysis_result)
        return artist, title    

    else:
        return "", ""
    
def emotion_man_recommendation(user_input: str = ""):
    tokenizer, model = load_model()
    analysis_result = predict(user_input, tokenizer, model)
    if analysis_result:
        title, artist, emo = manhattan_dis_output(analysis_result=analysis_result)
        return artist, title    

    else:
        return "", ""