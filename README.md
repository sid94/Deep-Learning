# Deep learning


## Spam Ham Classifier

This is a classic machine learning problem solved using Deep Learning based LSTM Model. We have built this model using pre processed labelled emails which were classified as spam or ham. We have exposed this trained model DL model using flask api.

This api is consumed by a react based UI which can post preprocessed emails and this posted email will be classified either as spam or ham email.

#### Technologies :
Python, Tensorflow, Keras, LSTM, NLP, Flask, React, HTML, CSS

## Sentiment Analysis of Real Time Tweets from Twitter API

This project will analyze the sentiments of users tweet extracted from a real-time twitter api. We have built a Deep learning based LSTM model trained on google colab using 1.6 million labelled tweet dataset. We have exposed this trained DL model using flask api. This deep learning solution is also containerized and available as a docker image stored in docker hub sid94docker/sentimentanalyzer:v1. 

Using twitter official api in nodejs we have consumed the stream of tweets and passed to the Apache Kafka producer. This passed data is consumed by kafka consumer and processed for polarity of the tweets using sentiment analyzer api. Polarity of the tweets will be Negative, Neutral or Positive. This processed tweet data will emitted using eventemitter3 and will be observed by index.js. This processed stream of data then will be sent to UI using a Socket connection which will be extablished using socket.io.

This tweet data is consumed on a React based UI

  #### Technologies :
  Google Colab, GPU, Python, Tensorflow, Keras, LSTM, NLP, Flask, Docker, NodeJS, Twitter API, Apache Kafka, Socket.io, Event Emitters, MongoDB, React, HTML, CSS