var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const cors = require('cors');
const axios = require("axios");
const PORT = 3100;

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
    res.json({"message": "Welcome to TELEGRAM API."});
});

//This is the route the API will call
app.post("/new-message", function(req, res) {

	const { message } = req.body;
        
        let text = null;
        
        console.log(req);
        console.log(message);
        
	//Each message contains "text" and a "chat" object, which has an "id" which is the chat id

	if (!message || typeof message.chat == "undefined") {
            
            if (typeof message.text == "undefined") {
                text = "Can't get it, Please try again!!"
            } else {
                text = "Is it " + message.text + "?";
            }
	}

	// If we've gotten this far, it means that we have received a message containing the word "marco".
	// Respond by hitting the telegram bot API and responding to the appropriate chat_id with the word "Polo!!"
	// Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
	
        if(typeof text !== "undefined" || text !== null) {
        axios.post(
			"https://api.telegram.org/bot1722900443:AAHIJVT5hgwDqR4XuW6NlmBRCt3isKgGZoE/sendMessage",
			{
				chat_id: message.chat.id,
				text: text
			}
		)
		.then((response) => {
			// We get here if the message was successfully posted
			console.log("Message posted");
			res.end("ok");
		})
		.catch((err) => {
			// ...and here if it was not
			console.log("Error :", err);
			res.end("Error :" + err);
		});
            }
});

// Finally, start our server
app.listen(PORT, function() {
	console.log(`Telegram app listening on port ${PORT}!`);
});

module.exports = app;