import readFile
import numpy as np
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout
from keras.layers.embeddings import Embedding
from keras.models import model_from_json



message, label = readFile.dataRead()

message = np.asarray(message)
label = np.asarray(label)

max_vocab = 15000
max_len = 700

tokenizer = Tokenizer(num_words=max_vocab)
tokenizer.fit_on_texts(message)
sequence = tokenizer.texts_to_sequences(message)

word_index = tokenizer.word_index
data = pad_sequences(sequence, maxlen=max_len)

train_samples = int(len(message)*0.8)
message_train = data[:train_samples]
label_train = label[:train_samples]
message_test = data[train_samples:len(message)-2]
label_test = label[train_samples:len(message)-2]

embedding_mat_columns=32
model = Sequential()
model.add(Embedding(input_dim=max_vocab, output_dim=embedding_mat_columns, input_length=max_len))
model.add(Dropout(0.5))
model.add(LSTM(units=embedding_mat_columns, recurrent_dropout=0.5))
model.add(Dropout(0.5))
model.add(Dense(1, activation='sigmoid'))
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

model.fit(message_train, label_train, epochs=3, batch_size=60, validation_split=0.2)
acc = model.evaluate(message_test, label_test)
print("Test loss is {0:.2f} accuracy is {1:.2f}" .format(acc[0],acc[1]))

# def message_to_array(msg):
#     testtext = []
#     testtext.append(msg)
    
#     testmsg = np.asarray(testtext)
#     testseq = tokenizer.texts_to_sequences(testmsg)
#     testdata = pad_sequences(testseq, maxlen=max_len)
#     return testdata

# custom_msg_ham = 'Subject: cut your medic @ l costs by 65 % on brand name medic @ tions . cut your medic @ l costs by 65 % on brand name medic @ tions . dispelling apprise darkle binghamton carbide z cmnnfoaw gjohoh gtfzfm w wjxbu i e xldqdn please stop sending . . . . . . . . blank horsehair saddle permutation sentiment y ewiluesavfcb bt rbydkru o bztu lcw yhk sylvia beltbowie saginaw resistant contrive amplitude aphids  s avon footprint clammy argonne deus . - - - - - begin pgp signature - - - - - version : pgp 8 . 0 . 2 - not licensed for commercial use : www . pgp . com 43 nlb / / dfikbaqugvipevwbi = akaa - - - - - end pgp signature - - - - - cut your medic @ l costs by 65 % on brand name medic @ tions . 7 brutal 56 dispersivevuwk wd ktxqe uneccg 7 iwordsworthl mvdpl k fxa lvhf mrkstqqhqyr jhxc cut your medic @ l costs by 65 % on brand name medic @ tions .'
# test_seq = message_to_array(custom_msg_ham)
# pred = model.predict_classes(test_seq)[0][0]
# print(pred)

# serialize model to JSON
model_json = model.to_json()
with open("model.json", "w") as json_file:
    json_file.write(model_json)
# serialize weights to HDF5
model.save_weights("model.h5")
print("Saved model to disk")