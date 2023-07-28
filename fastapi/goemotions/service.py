
from .pipeline import load_model, predict
from .model import cosine_sim_output, manhattan_dis_output, test_cosine_sim_output

def test_emotion_cos_recommendation(user_input : str = ""):
    tokenizer, model = load_model()
    analysis_result = predict(user_input, tokenizer, model)
    if analysis_result:
        #result = cosine_sim_output(analysis_result=analysis_result)
        result = test_cosine_sim_output(analysis_result=analysis_result)
        #top3 = [ (result.iloc[i]['artist'], result.iloc[i]['title']) for i in range(len(result)) ]
        return result

    else:
        return []

def emotion_cos_recommendation(user_input : str = ""):
    tokenizer, model = load_model()
    analysis_result = predict(user_input, tokenizer, model)
    if analysis_result:
        result = cosine_sim_output(analysis_result=analysis_result)
        top3 = [ (result.iloc[i]['artist'], result.iloc[i]['title']) for i in range(len(result)) ]
        return top3

    else:
        return []
    
def emotion_man_recommendation(user_input: str = ""):
    tokenizer, model = load_model()
    analysis_result = predict(user_input, tokenizer, model)
    if analysis_result:
        title, artist, emo = manhattan_dis_output(analysis_result=analysis_result)
        return artist, title    

    else:
        return "", ""
    
