require('dotenv').config();

const config = {
    KafkaHost: process.env.KAFKA_HOST || 'localhost:9092',
    KafkaTopic: process.env.KAFKA_TOPIC || 'tweetstream',
    KafkaProcessedTweetTopic: process.env.KAFKA_PROCESSED_TOPIC || 'processedData'
};

module.exports = config