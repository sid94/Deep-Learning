const kafka = require('kafka-node');
const config = require('./config');
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
            topic: config.KafkaProcessedTweetTopic,
            partition: 0
        }], {
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            encoding: 'utf8'
        }
    );
    consumer.on('message', function (message) {
        msg = JSON.parse(message.value)
        //console.log(msg[0]._id)

        if (msg != undefined && msg.length > 0) {
            msg.forEach((elem) => {
            EE.emit('tweetStream', elem)
        });
      }
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