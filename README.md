# Deep learning


## Spam Ham Classifier

## Sentiment Analysis of Real Time Tweets from Twitter API

This project will analyze the sentiments of users tweet extracted from a real-time twitter api. We have built a Deep learning based LSTM model trained on google colab using 1.6 million labelled tweet dataset. We have exposed this pre-trained DL model using flask api. Further detail regarding api given below. This deep learning solution is also containerized and available as a docker image stored in docker hub sid94docker/sentimentanalyzer:v1. 

Using twitter official api in nodejs we have consumed the stream of tweets and passed to the Apache Kafka producer. This passed data is consumed by kafka consumer and processed for polarity of the tweets using sentiment analyzer api. Polarity of the tweets will be Negative, Neutral or Positive. This processed tweet data will emitted using eventemitter3 and will be observed by index.js. This processed stream of data then will be sent to UI using a Socket connection which will be extablished using socket.io.

This tweet data is consumed on a React based UI

  #### Technologies :
  Python, Tensorflow, Keras, LSTM, NLP, Flask, Docker, NodeJS, Twitter API, Apache Kafka, Socket.io, Event Emitters, MongoDB, React, HTML, CSS