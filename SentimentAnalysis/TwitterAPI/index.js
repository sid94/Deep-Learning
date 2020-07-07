let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
const Twitter = require('twitter');
const config = require('./config.js');
const EE = require('./kafka/consumer');
const port = process.env.PORT || 4200;

app.use(express.static(__dirname + '/statics'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/view/index.html');
});



//Pass configuration details to Twitter npm module
let T = new Twitter(config);

//Make a call to Twitter API
io.on('connection', function(socket){
    let tweetArr = [];
    // var stream = T.stream('statuses/filter', {track: 'trump2020landslide', tweet_mode: 'extended'});
    EE.on('tweetStream', function(tweet) {
        // if (tweet.hasOwnProperty("retweeted_status")){
        //     try{
        //         tweetArr.push(tweet);
        //         socket.emit('tweet', tweet.retweeted_status.extended_tweet['full_text']);
        //     }
        //     catch(error){
        //         tweetArr.push(tweet);
        //         socket.emit('tweet', tweet.retweeted_status.text);
        //     }
        // }
        // else{
        //     try{
        //         tweetArr.push(tweet);
        //         socket.emit('tweet', tweet.extended_tweet['full_text']);
        //     }
        //     catch(error){
        //         tweetArr.push(tweet);
        //         socket.emit('tweet', tweet.text);
        //     }
        // }
        if(tweet.hasOwnProperty('data') && tweet.data.length > 0){
            tweet.data.forEach(element => {
                socket.emit('tweet', element.text);
            });
        }
    });
    
    EE.on('error', function(error) {
        throw error;
    });
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});