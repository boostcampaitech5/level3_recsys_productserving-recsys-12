from transformers import ElectraTokenizer
from model import ElectraForMultiLabelClassification
import pickle
import torch

tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-goemotions")
model = ElectraForMultiLabelClassification.from_pretrained("monologg/koelectra-base-v3-goemotions")

with open("tokenizer.pkl", "wb") as f:
    pickle.dump(tokenizer, f)

model.save_pretrained('goemotion_model')