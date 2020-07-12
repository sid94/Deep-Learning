const kafka = require('kafka-node');
const config = require('./config');
const axios = require("axios");
const producer = require('./producer');

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
        //Test the consumer message id
        //msg = JSON.parse(message.value)
        //console.log(msg[0]._id)

        await axios.post('http://localhost:5000/predict', {
            tweets : JSON.parse(message.value)
          })
          .then(async function (response) {
            await axios.post('http://localhost:4000/tweets', response.data)
            //return response;
            producer.pushDataToKafka(response);
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
