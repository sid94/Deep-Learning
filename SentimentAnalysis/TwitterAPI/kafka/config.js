require('dotenv').config();

const config = {
    KafkaHost: process.env.KAFKA_HOST || 'localhost:9092',
    KafkaTopic: process.env.KAFKA_TOPIC || 'tweetdata',
    consumer_key: 'P3qOeX5luAuKFxcMJvhP7RYBA',
    consumer_secret: '0lBHkESSb0PEENyPSE57a8bq8gxfwd7Jc5g5x5TwOKSMjV7QEX',
    access_token_key: '1278782635066691591-ejjkw3Bbhv27kEcEihoo2Om09utkgL',
    access_token_secret: 'l2URpXvBIwBBL7fykULt0frosUR4OSZC5xAsVGvutijck'
};

module.exports = config