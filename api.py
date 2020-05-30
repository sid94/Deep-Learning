from flask import Flask,render_template,url_for,request,json,jsonify
import os
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
from tensorflow.keras.models import model_from_json
import sys

app = Flask(__name__)

a =  "Hello Flask"

max_vocab = 15000
max_len = 700

loaded_model = load_model('model.h5')

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/detect", methods=["POST"])
def detect():
    my_prediction = ""
    req_data = request.get_json()
    data = json.loads(request.data.decode('UTF-8'))
    message = data['data']
    res = {}
    if(message):
        testtext = []
        testtext.append(message)
        testmsg = np.asarray(testtext)
        tokenizer = Tokenizer(num_words=max_vocab)
        testseq = tokenizer.texts_to_sequences(testmsg)
        testdata = pad_sequences(testseq, maxlen=max_len)
        my_prediction = loaded_model.predict_classes(testdata)[0][0]
        #my_prediction = np.argmax(loaded_model.predict(testdata), axis=-1)[0]
        res['prediction'] = str(my_prediction)
    return jsonify(res)

    
if __name__ == "__main__":
    app.run()