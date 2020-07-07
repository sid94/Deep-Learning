const kafka = require('kafka-node');
const config = require('./config');
const bodyparser = require("body-parser");
const axios = require("axios");
const EventEmitter = require("eventemitter3");

let EE = new EventEmitter();

try {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient({
        idleConnection: 24 * 60 * 60 * 1000,
        kafkaHost: config.KafkaHost
    });

    let consumer = new Consumer(
        client,
        [{
            topic: config.KafkaTopic,
            partition: 0
        }], {
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            encoding: 'utf8'
        }
    );
    consumer.on('message', async function (message) {
        await axios.post('http://localhost:5000/predict', {
            tweets : JSON.parse(message.value)
          })
          .then(async function (response) {
            //console.log(JSON.stringify(response.data.data[0]._id));
            await axios.post('http://localhost:4000/tweets', response.data)
          })
          .then((res) => {
            //console.log('Tweets stored in database');
            EE.emit('tweetStream', response.data);
            })
          .catch(function (error) {
            console.log(error);
          });
    })
    consumer.on('error', function (error) {
        //  handle error 
        console.log('error', error);
    });
} catch (error) {
    // catch error trace
    console.log(error);
}

module.exports = EE;