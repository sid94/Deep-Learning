//Purpose:::Saved configuration information related to Twitter Developer Account
require('dotenv').config();

module.exports = {
    KafkaHost: process.env.KAFKA_HOST || 'localhost:9092',
    KafkaTopic: process.env.KAFKA_TOPIC || 'tweetstream'
}