from flask import Flask,render_template,url_for,request
import os
import numpy as np
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model
from keras.models import model_from_json
app = Flask(__name__)

a =  "Hello Flask"

max_vocab = 15000
max_len = 700

json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
# load weights into new model
loaded_model.load_weights("model.h5")
print("Loaded model from disk")
loaded_model.save('model.hdf5')
loaded_model = load_model('model.hdf5')

#loaded_model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

@app.route("/")
def home():
    # return render_template('home.html')
    return 'Shweta home'

@app.route("/detect")
def detect():
    my_prediction = ""
    #message = request.form['message']
    message = 'Subject: cut your medic @ l costs by 65 % on brand name medic @ tions . cut your medic @ l costs by 65 % on brand name medic @ tions . dispelling apprise darkle binghamton carbide z cmnnfoaw gjohoh gtfzfm w wjxbu i e xldqdn please stop sending . . . . . . . . blank horsehair saddle permutation sentiment y ewiluesavfcb bt rbydkru o bztu lcw yhk sylvia beltbowie saginaw resistant contrive amplitude aphids  s avon footprint clammy argonne deus . - - - - - begin pgp signature - - - - - version : pgp 8 . 0 . 2 - not licensed for commercial use : www . pgp . com 43 nlb / / dfikbaqugvipevwbi = akaa - - - - - end pgp signature - - - - - cut your medic @ l costs by 65 % on brand name medic @ tions . 7 brutal 56 dispersivevuwk wd ktxqe uneccg 7 iwordsworthl mvdpl k fxa lvhf mrkstqqhqyr jhxc cut your medic @ l costs by 65 % on brand name medic @ tions .'
        #Pass this message variable to the prediction method
    print(message)
    if(message):
        testtext = []
        testtext.append(message)
        
        testmsg = np.asarray(testtext)
        tokenizer = Tokenizer(num_words=max_vocab)
        testseq = tokenizer.texts_to_sequences(testmsg)
        testdata = pad_sequences(testseq, maxlen=max_len)
        
        my_prediction = loaded_model.predict_classes(testdata)[0][0]
        # return render_template('result.html', prediction=my_prediction)
        print(my_prediction)
    # return "My prediction:" + list(my_prediction)

    
if __name__ == "__main__":
    app.run()