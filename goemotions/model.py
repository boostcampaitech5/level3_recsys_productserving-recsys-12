import torch.nn as nn
from torch.nn import BCEWithLogitsLoss
from transformers import ElectraModel, ElectraPreTrainedModel
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import os

def cosine_sim_output(analysis_result):
    data_path = '../../data/'
    music_data = pd.read_csv(os.path.join(data_path, 'last_data.csv'), encoding="utf-8")

    labels = ['admiration', 'anger', 'approval', 'caring', 'confusion',
          'curiosity', 'desire', 'disappointment', 'disapproval', 'embarrassment',
          'excitement', 'fear', 'gratitude', 'joy', 'love', 'optimism',
          'pride', 'realization', 'relief', 'sadness', 'neutral']
    
    result = music_data.groupby(['title', 'artist'], as_index=False)[labels].agg('sum')
    
    temp = result.iloc[:,[i for i in range(2,23)]]

    cosine_sim = cosine_similarity(analysis_result, temp[:1])
        
    x = 0
    t = 0 # index
    for i, j in enumerate(cosine_sim):
        if j >= x:
            t = i
            x = j

    name = result.iloc[t+1]['title']
    artist = result.iloc[t+1]['artist']
    
    return name, artist


class ElectraForMultiLabelClassification(ElectraPreTrainedModel):
    def __init__(self, config):
        super().__init__(config)
        self.num_labels = config.num_labels

        self.electra = ElectraModel(config)
        self.dropout = nn.Dropout(config.hidden_dropout_prob)
        self.classifier = nn.Linear(config.hidden_size, self.config.num_labels)
        self.loss_fct = BCEWithLogitsLoss()

        self.init_weights()

    def forward(
            self,
            input_ids=None,
            attention_mask=None,
            token_type_ids=None,
            position_ids=None,
            head_mask=None,
            inputs_embeds=None,
            labels=None,
    ):
        discriminator_hidden_states = self.electra(
            input_ids, attention_mask, token_type_ids, position_ids, head_mask, inputs_embeds
        )
        pooled_output = discriminator_hidden_states[0][:, 0]

        pooled_output = self.dropout(pooled_output)
        logits = self.classifier(pooled_output)

        outputs = (logits,) + discriminator_hidden_states[1:]  # add hidden states and attention if they are here

        if labels is not None:
            loss = self.loss_fct(logits, labels)
            outputs = (loss,) + outputs

        return outputs  # (loss), logits, (hidden_states), (attentions)