const Kafka = require('kafka-node');
const config = require('./config');

const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({
    kafkaHost: config.KafkaHost
});
const producer = new Producer(client, {
    requireAcks: 0,
    partitionerType: 2
});

// const pushDataToKafka = () => {
//     let dataToPush = response;
//     try {
//         let payloadToKafkaTopic = [{
//             topic: config.KafkaProcessedTweetTopic,
//             messages: JSON.stringify(dataToPush.data)
//         }];
//         console.log("Process Producer: "+ dataToPush.data[0]._id);
//         producer.on('ready', function () {
//             console.log("kafka producer is ready")
//         })
//         producer.send(payloadToKafkaTopic, (err, data) => {
//         });
//         producer.on('error', function (err) {
//             //  handle error cases here
//         })
//     } catch (error) {
//         console.log(error);
//     }

// };

pushDataToKafka = function (response){
    let dataToPush = response.data;
    try {
        let payloadToKafkaTopic = [{
            topic: config.KafkaProcessedTweetTopic,
            messages: JSON.stringify(dataToPush.data)
        }];
        console.log("Process Producer: "+ dataToPush.data[0]._id);
        producer.on('ready', function () {
            console.log("kafka producer is ready")
        })
        producer.send(payloadToKafkaTopic, (err, data) => {
        });
        producer.on('error', function (err) {
            //  handle error cases here
        })
    } catch (error) {
        console.log(error);
    }
}

exports.pushDataToKafka = pushDataToKafka;