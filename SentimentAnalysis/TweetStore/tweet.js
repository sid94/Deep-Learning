let mongoose = require('mongoose');

let tweetSchema = new mongoose.Schema({
        tweetID : {
            type : String,
            unique : true
        },
        tweetText : String,
        score     : Number,
        polarity  : String,
        active    : Boolean
});

//static getTweets method to return tweets from DB
tweetSchema.statics.getTweets = function(page, skip, callback) {
    let tweets = [], start = (page * 10) + (skip * 1);
    //Query the db using skip and limit to achieve page chunks
    tweetSchema.find({}, 'tweetID, tweetText, score, polarity', {skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err, docs){
        if(!err){
            tweets = docs;
            tweets.forEach(tweet => {
                tweet.active = true;
            });
        }
        callback(tweets);
    });
}

module.exports = mongoose.model('Tweet', tweetSchema);