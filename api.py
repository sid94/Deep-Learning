from flask import Flask,render_template,url_for,request,json
import os
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
from tensorflow.keras.models import model_from_json


app = Flask(__name__)

a =  "Hello Flask"

max_vocab = 15000
max_len = 700

# json_file = open('model.json', 'r')
# loaded_model_json = json_file.read()
# json_file.close()
# loaded_model = model_from_json(loaded_model_json)
# # load weights into new model
# loaded_model.load_weights("model.h5")
# print("Loaded model from disk")
# loaded_model.save('model.hdf5')
loaded_model = load_model('model.h5')

#loaded_model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

@app.route("/")
def home():
    # return render_template('home.html')
    return 'Shweta home'

@app.route("/detect", methods=["POST"])
def detect():
    my_prediction = ""
    req_data = request.get_json()
    message = req_data['data']
    if(message):
        testtext = []
        testtext.append(message)
        testmsg = np.asarray(testtext)
        tokenizer = Tokenizer(num_words=max_vocab)
        testseq = tokenizer.texts_to_sequences(testmsg)
        testdata = pad_sequences(testseq, maxlen=max_len)
        my_prediction = loaded_model.predict_classes(testdata)[0][0]
        #my_prediction = np.argmax(loaded_model.predict(testdata), axis=-1)[0]
    return "My prediction:" + str(my_prediction)

    
if __name__ == "__main__":
    app.run()