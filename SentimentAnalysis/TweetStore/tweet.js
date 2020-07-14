let mongoose = require('mongoose');

let tweetSchema = new mongoose.Schema({
        _id : String,
        text : String,
        score     : Number,
        label  : String,
        active    : Boolean,
        timestamp : String,
        username : String,
        twitterid : String
});

//static getTweets method to return tweets from DB
// tweetSchema.statics.getTweets = function(page, skip, callback) {
//     let tweets = [], start = (page * 10) + (skip * 1);
//     //Query the db using skip and limit to achieve page chunks
//     tweetSchema.find({}, '_id, text, score, label', {skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err, docs){
//         if(!err){
//             tweets = docs;
//             tweets.forEach(tweet => {
//                 tweet.active = true;
//             });
//         }
//         callback(tweets);
//     });
// }

module.exports = mongoose.model('Tweet', tweetSchema);