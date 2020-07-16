from flask import Flask,render_template,url_for,request,json,jsonify
from flask_cors import CORS
import os
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import sys
import pickle
import time
import re
import nltk
from nltk.tokenize import word_tokenize
from string import punctuation 
nltk.download('stopwords')
from nltk.corpus import stopwords 
from nltk.stem import SnowballStemmer
import copy

app = Flask(__name__)
CORS(app)


model = load_model('model/model.h5')
print("model loaded")
with open('model/tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)
print("tokenizer loaded")
if(model != None and tokenizer != None):
    print("true\n")

def preprocess(text, stem=False):
    TextProcessingRE = "@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+"
    _stopwords = stopwords.words("english")
    _stemmer = SnowballStemmer("english")
    text = re.sub(TextProcessingRE,' ', str(text).lower()).strip()
    wordtokens = []
    for word in text.split():
        if word not in _stopwords:
            if stem:
                wordtokens.append(_stemmer.stem(word))
            else:
                wordtokens.append(word)
    return " ".join(wordtokens)

def decode_sentiment(score, include_neutral=True):
    POSITIVE = "POSITIVE"
    NEGATIVE = "NEGATIVE"
    NEUTRAL = "NEUTRAL"
    SENTIMENT_THRESHOLDS = (0.4, 0.7)
    if include_neutral:
        label = NEUTRAL
        if score <= SENTIMENT_THRESHOLDS[0]:
            label = NEGATIVE
        elif score >= SENTIMENT_THRESHOLDS[1]:
            label = POSITIVE
        return label
    else:
        return NEGATIVE if score < 0.5 else POSITIVE

def predictSentiment(text, include_neutral=True):
      start_at = time.time()
      MAX_LEN = 300
      #tokenize text
      if(tokenizer != None):
          print("tokenizer not none")
      text = preprocess(text)
      x_test = pad_sequences(tokenizer.texts_to_sequences([text]), maxlen=MAX_LEN)
      score = model.predict([x_test])[0]
      label = decode_sentiment(score, include_neutral=include_neutral)
      return {"label": label, "score" : float(score), "elapsed_time": time.time()-start_at}        

@app.route("/")
def home():
    return "api is running succesfully"

@app.route("/predict", methods=["POST"])
def predict():
    datalist = []
    data = json.loads(request.data)
    text = data.get("tweets",None)
    if text is None:
        return jsonify({"message":"tweets not found"})
    else:
        for i,data in enumerate(text):
            prediction = predictSentiment(data["text"])
            z = data.copy()
            z.update(prediction)
            datalist.append(z)
        return {"data": datalist}

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False)