require('dotenv').config();

const config = {
    KafkaHost: process.env.KAFKA_HOST || 'localhost:9092',
    KafkaTopic: process.env.KAFKA_TOPIC || 'tweetstream',
    KafkaProcessedTweetTopic: process.env.KAFKA_PROCESSED_TOPIC || 'processedData',
    sentimentAnalyzerEndPoint: process.env.SENTIMENT_API_ENDPOINT || 'http://localhost:5000/predict',
    tweetStoreServiceEndPoint: process.env.TWEET_STORE_ENDPOINT || 'http://localhost:4000/tweets'
};

module.exports = config