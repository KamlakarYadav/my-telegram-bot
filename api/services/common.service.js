
const express = require('express');
const axios = require("axios");
const schedule = require("node-schedule");
var router = express.Router();

const telegramBotToken = "1624236294:AAFl3KvH7Fo_XRLDZ5UPFgJwUvTq_4n8lIc";
const telegramBotSendUrl = "https://api.telegram.org/"+ telegramBotToken +"/sendMessage";


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
            } else {
                if (typeof message.text === "undefined") {
                    text = "Can't get it, Please try again!!";
                } else {

                    let sMsgText = message.text;

                    let res1 = sMsgText.match(/\$[a-zA-Z\d\-\/]{1,}\$/gm);

                    let company_dsi = sMsgText.match(/\/company_dsi/gm);

                    console.log(company_dsi);

                    if (company_dsi !== null) {
                        const params = sMsgText.split(' ');
                        console.log(params);
                        const param1 = params[1];
                        console.log(param1);
                        const param2 = params[2];
                        console.log(param2);

                        if (param1 === undefined || param2 === undefined) {
                            axios.post(
                                    telegramBotSendUrl,
                                    {
                                        chat_id: message.chat.id,
                                        text: "Please provide a valid inputs!"
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
                            return;
                        }

                        axios.post(
                                telegramBotSendUrl,
                                {
                                    chat_id: message.chat.id,
                                    text: `${param2} ${param1}: 5`
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
                    } else if (res1 !== null) {
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

//                        let rows = await Common.save(oMsg);

//                        let result = JSON.parse(JSON.stringify(rows))[2][0];
//                        response.status(200).send(result);

//                        console.log(result);

//                        text = result;
                        if (typeof text !== "undefined" || text !== null) {
                            axios.post(
                                    telegramBotSendUrl,
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
                        }

//                        let todaysTotalDsi = await Common.getTodaysTotalDsi();
//                        let oTodaysTotalDsi = JSON.parse(JSON.stringify(todaysTotalDsi[0]));

//                        let todaysGroupwiseTotalDsi = await Common.getTodaysGroupwiseTotalDsi();
//                        let oTodaysGroupwiseTotalDsi = JSON.parse(JSON.stringify(todaysGroupwiseTotalDsi[0]));

//                        console.log(oTodaysTotalDsi);
//                        console.log(oTodaysGroupwiseTotalDsi);


//                        text += oTodaysTotalDsi;

//                        text += oTodaysGroupwiseTotalDsi;

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