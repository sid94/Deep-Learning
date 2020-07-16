const Kafka = require('kafka-node');
const config = require('./config');
const secret = require('./secret');

const Twitter = require('twitter');

const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({
    kafkaHost: config.KafkaHost
});
const producer = new Producer(client, {
    requireAcks: 0,
    partitionerType: 2
});

let T = new Twitter((({ consumer_key, consumer_secret,access_token_key,access_token_secret}) => ({  consumer_key, consumer_secret,access_token_key,access_token_secret}))(secret));

const pushDataToKafka = (dataToPush,config) => {
    try {
    
    if(!isNullorUndefined(dataToPush) && !isNullorUndefined(dataToPush[0]) && 
    !isNullorUndefined(dataToPush[0]._id) && !isNullorUndefined(dataToPush[0].text)){
        let payloadToKafkaTopic = [{
            topic: config.KafkaTopic,
            messages: JSON.stringify(dataToPush)
        }];
        console.log(dataToPush[0]._id)
        producer.on('ready', function () {
            console.log("kafka producer is ready")
        })
        producer.send(payloadToKafkaTopic, (err, data) => {
        });
        producer.on('error', function (err) {
            //  handle error cases here
        })

    }
    } catch (error) {
        console.log(error);
    }

};


let getTweetStream = function(stream) {
    stream.on('data', function(tweet) {
        let tweetArr = [];
        if (tweet.hasOwnProperty("retweeted_status")){
            try{
                if(!isNullorUndefined(tweet) && !isNullorUndefined(tweet.retweeted_status) && !isNullorUndefined(tweet.retweeted_status.extended_tweet) && !isNullorUndefined(tweet.retweeted_status.extended_tweet['full_text'])){
                    tweetArr.push({"_id" : tweet.id_str, "text": tweet.retweeted_status.extended_tweet['full_text'], 
                "timestamp" : tweet.created_at, "username" : tweet.user.name, "twitterid" : tweet.user.screen_name
                });
                }else{
                    tweetArr.push({"_id":tweet.id_str,"text":tweet.retweeted_status.text,
                    "timestamp" : tweet.created_at, "username" : tweet.user.name, "twitterid" : tweet.user.screen_name});
                }
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            try{
                if(!isNullorUndefined(tweet) && !isNullorUndefined(tweet.extended_tweet) && !isNullorUndefined(tweet.extended_tweet['full_text'])){
                    tweetArr.push({"_id":tweet.id_str,"text":tweet.extended_tweet['full_text'],
                    "timestamp" : tweet.created_at, "username" : tweet.user.name, "twitterid" : tweet.user.screen_name})
                }else{
                    tweetArr.push({"_id":tweet.id_str,"text":tweet.text,
                    "timestamp" : tweet.created_at, "username" : tweet.user.name, "twitterid" : tweet.user.screen_name});
                }
            }
            catch(error){
                console.log(error)
            }
        }
        pushDataToKafka(tweetArr, config);
    });
    
    
    stream.on('error', function(error) {
        console.log(error);
    });
}

T.stream('statuses/filter', {track: 'trump2020landslide', tweet_mode: 'extended'}, getTweetStream.bind(this.config));

function isNullorUndefined(val){
    return (val === undefined || val == null || val.length <= 0 || Object.keys(val).length === 0);
}
