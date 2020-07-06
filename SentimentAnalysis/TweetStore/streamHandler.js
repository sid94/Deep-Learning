let Tweet = require('./tweet');

module.exports = function(stream){
    stream.forEach(tweetdata => {
        let tweetEntry = new Tweet(tweetdata);
        tweetEntry.save(function(err){
            if(err){
                console.log('Error while saving tweet entry to database');
            }
        });
    });
}