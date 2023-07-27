from transformers import ElectraTokenizer
from .model import ElectraForMultiLabelClassification
from pprint import pprint
import torch
import numpy as np
import pickle

from .filepath import TOKENIZER_PATH

def load_model():
    with open(TOKENIZER_PATH, "rb") as f:
        tokenizer = pickle.load(f)
        f.close()
    model = ElectraForMultiLabelClassification.from_pretrained("monologg/koelectra-base-v3-goemotions")
    return tokenizer, model

def predict(text, tokenizer, model):
    inputs = tokenizer(text,return_tensors="pt")
    outputs = model(**inputs)
    scores =  1 / (1 + torch.exp(-outputs[0]))
    threshold = 0
    result = []
    for item in scores:
        labels = []
        scores = []
        for idx, s in enumerate(item):
            if s > threshold:
                labels.append(model.config.id2label[idx])
                scores.append(s.item())
        result.append({"labels": labels, "scores": scores})

    return result