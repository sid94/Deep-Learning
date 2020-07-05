let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
const Twitter = require('twitter');
const config = require('./config.js');

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});



//Pass configuration details to Twitter npm module
let T = new Twitter(config);

//Make a call to Twitter API
io.on('connection', function(socket){
    console.log('Client connected');
    var stream = T.stream('statuses/filter', {track: 'trump2020landslide', tweet_mode: 'extended'});
    stream.on('data', function(tweet) {
        if (tweet.hasOwnProperty("retweeted_status")){
            try{
                socket.emit('tweet', tweet.retweeted_status.extended_tweet['full_text']);
            }
            catch(error){
                socket.emit('tweet', tweet.retweeted_status.text);
            }
        }
        else{
            try{
                socket.emit('tweet', tweet.extended_tweet['full_text']);
            }
            catch(error){
                socket.emit('tweet', tweet.text);
            }
        }
    });
    
    stream.on('error', function(error) {
        throw error;
    });
});

server.listen(4200);