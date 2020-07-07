let Tweet = require('./tweet');

module.exports = function(stream){
    stream.data.forEach(tweetdata => {
        let tweetEntry = new Tweet(tweetdata);
        Tweet.count({_id: tweetEntry._id}, function(err, count) {
            if(count > 0){
                console.error('Id already exist');
                //throw new Error('Id already exist');
            }
            else{
                tweetEntry.save(function(err){
                    if(err){
                        console.error(err);
                    }
                });
            }
        })
    });
}