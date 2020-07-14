let cors = require('cors');
let express = require('express');
let bodyParser = require('body-parser');
let streamHandler = require('./streamHandler');
let Database = require('./database');
let routes = require('./routes');
let Tweet = require('./tweet');
let port = process.env.PORT || 4000;

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

let app = express();

//make connection to database
let db = new Database();

app.use(cors());
app.use(bodyParser.json());

app.get('/', test());

//Index route ::: Get tweets from db
// app.get('/tweets', getTweets(app));
app.get('/getPolarity', getPolarityCount(app));

//Store tweets to db
app.post('/tweets', storeTweets(app));

app.use(doErrors());

app.listen(port, function(){
    console.log(`Listening on port ${port}`);
})

function test(app) {
    return errorWrap(async function (req, res) {
        try {
            res.json({"msg":"yes we did it"})
        }
        catch (err) {
            const mapped = mapError(err);
            res.status(mapped.status).json(mapped);
        }
    })
}

function storeTweets(app) {
    return errorWrap(async function (req, res) {
        try {
            const obj = req.body;
            const results = await streamHandler(obj);
            res.sendStatus(CREATED);
        }
        catch (err) {
            const mapped = mapError(err);
            res.status(mapped.status).json(mapped);
        }
    })
}

function getTweets(app) {
    return errorWrap(async function (req, res) {
        try {
            const result =  await routes();
            res.json(result)
        }
        catch (err) {
            const mapped = mapError(err);
            res.status(mapped.status).json(mapped);
        }
    })
}

function getPolarityCount(app){
    return errorWrap(async function(req, res){
        try{
            const result = await Tweet.aggregate([
                {
                    $group: {
                        _id : '$label',
                        count : {$sum : 1}
                    }
                }
            ]);
            res.json(result);
        }
        catch(err){
            const mapped = mapError(err);
            res.status(mapped.status).json(mapped);
        }
    })
}

function doErrors(app) {
    return async function (err, req, res, next) {
        res.status(SERVER_ERROR);
        res.json({ code: 'SERVER_ERROR', message: err.message });
        console.error(err);
    };
}

const ERROR_MAP = {
    EXISTS: CONFLICT,
    NOT_FOUND: NOT_FOUND
}

function mapError(err) {
    console.error(err);
    return err.isDomain
        ? {
            status: (ERROR_MAP[err.errorCode] || BAD_REQUEST),
            code: err.errorCode,
            message: err.message
        }
        : {
            status: SERVER_ERROR,
            code: 'INTERNAL',
            message: err.toString()
        };
}


/** Set up error handling for handler by wrapping it in a 
 *  try-catch with chaining to error handler on error.
 */
function errorWrap(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (err) {
            next(err);
        }
    };
}