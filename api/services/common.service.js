
const express = require('express');
const axios = require("axios");
const schedule = require("node-schedule");
var router = express.Router();

module.exports = function (Common, oauth, log) {

    router.get('/search', [], async function (request, response, next) {
        try {
            let result = await Common.getAllItem(request.params);
            response.send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Itemmaster-getAllItem", err);
        }
    });

    router.post('/new-message', [], async function (req, res, next) {
        try {

            console.log("req", req.body);
            const message = req.body.message;

            console.log("message", message);

            let text = message;

            //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

            if (!message || typeof message.chat === "undefined") {
                text = "Can't get it, Please try again!!";
                
                axios.post(
                                "https://api.telegram.org/bot1673619098:AAFs41c9rnkikfwpdhcdBjJQgfB16CjYGnw/sendMessage",
                                {
                                    chat_id: message.chat.id,
                                    text: text
                                }
                        ).then((response) => {
                            // We get here if the message was successfully posted
                            console.log("Message posted");
                            res.end("ok");
                        })
                                .catch((err) => {
                                    // ...and here if it was not
                                    console.log("Error :", err);
                                    res.end("Error :" + err);
                                });
                                
                res.end("ok");
            } else {
                if (typeof message.text === "undefined") {
                    text = "Can't get it, Please try again!!";
                    
                    axios.post(
                                "https://api.telegram.org/bot1673619098:AAFs41c9rnkikfwpdhcdBjJQgfB16CjYGnw/sendMessage",
                                {
                                    chat_id: message.chat.id,
                                    text: text
                                }
                        ).then((response) => {
                            // We get here if the message was successfully posted
                            console.log("Message posted");
                            res.end("ok");
                        })
                                .catch((err) => {
                                    // ...and here if it was not
                                    console.log("Error :", err);
                                    res.end("Error :" + err);
                                });
                                
                    res.end("ok");
                } else {

                    let sMsgText = message.text;

                    let res1 = sMsgText.match(/\$[a-zA-Z\d\-\/]{1,}\$/gm);
                    
                    if (res1 !== null) {
                        let aMsgText = res1[0].split("-");

                        let oMsg = {
                            group: (typeof aMsgText[0] !== "undefined") ? aMsgText[0].replace('$', '') : "NA",
                            name: (typeof aMsgText[1] !== "undefined") ? aMsgText[1] : "NA",
                            company: (typeof aMsgText[2] !== "undefined") ? aMsgText[2] : "NA",
                            date: (typeof aMsgText[3] !== "undefined") ? aMsgText[3] : "NA",
                            members: (typeof aMsgText[4] !== "undefined") ? aMsgText[4].replace('$', '') : "NA",
                            chat_id: message.chat.id,
                            message: sMsgText
                        };

                        axios.post(
                                "https://api.telegram.org/bot1673619098:AAFs41c9rnkikfwpdhcdBjJQgfB16CjYGnw/sendMessage",
                                {
                                    chat_id: message.chat.id,
                                    text: oMsg
                                }
                        ).then((response) => {
                            // We get here if the message was successfully posted
                            console.log("Message posted");
                            res.end("ok");
                        })
                                .catch((err) => {
                                    // ...and here if it was not
                                    console.log("Error :", err);
                                    res.end("Error :" + err);
                                });

                    } else {
                        res.end("ok");
                    }
                    
                    let cmdStart = sMsgText.match(/\/start/gm);
                    
                    if (cmdStart !== null) {
//                        let aMsgText = res1[0].split("-");

                        let oMsg = "Welcome!!\nBot has been started successfully!!";

                            axios.post(
                                "https://api.telegram.org/bot1673619098:AAFs41c9rnkikfwpdhcdBjJQgfB16CjYGnw/sendMessage",
                                {
                                    chat_id: message.chat.id,
                                    text: oMsg
                                }
                        ).then((response) => {
                            // We get here if the message was successfully posted
                            console.log("Message posted");
                            res.end("ok");
                        })
                                .catch((err) => {
                                    // ...and here if it was not
                                    console.log("Error :", err);
                                    res.end("Error :" + err);
                                });

                    } else {
                        res.end("ok");
                    }

                }

            }

        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common-sendEmail", err);
        }
    });


    return router;
    
}