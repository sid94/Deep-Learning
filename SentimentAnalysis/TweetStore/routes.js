let Tweet = require('./tweet');

module.exports = function() {
    Tweet.getTweets(0,0, function(tweets, pages){
        return tweets;
    });
}