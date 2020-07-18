let mongoose = require('mongoose'); //creates instance of mongoose class and return same instance for subsequent calls

const server = process.env.MONGO_URL || "mongodb://localhost:27017";
const database = 'tweet-store'

class Database{
    constructor(){
        this._connect();
    }

    _connect(){
        mongoose.connect(`${server}/${database}`, {useNewUrlParser:true, useUnifiedTopology: true})
        .then(() => {
            console.log('Database connection successful');
        })
        .catch( err => {
            console.error('Database connection failed: ', err);
        });

    }
}

module.exports = Database;
