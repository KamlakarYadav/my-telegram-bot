const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var Container = require('plus.container');

// create express app
const app = express();
const PORT = 3110;
app.timeout = 1200000;

app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));

// Express 3.0
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));

const env = "development";

// parse requests of content-type - application/json
app.use(bodyParser.json()); 

app.all('/*', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (request.method === 'OPTIONS') {
        response.status(200).end();
    } else {
        next();
    }
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Telegram BOT API."});
});

require('./app.routes')(env, app, Container);

// listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;