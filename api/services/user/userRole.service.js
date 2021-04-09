var express = require('express');
var router = express.Router();
var ip = require("ip");

module.exports = function (UserRole, oauth, log) {

    router.get('/search', [], async function (request, response, next) {
        try {
            let result = await UserRole.all(request.params);
            response.send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("UserRole-all", err);
        }
    });

    router.get('/select/:id', [], async function (request, response, next) {
        try {
            let result = await UserRole.get(request.params);
            response.send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("UserRole-get", err);
        }
    });

    router.post('/', [], async function (request, response, next) {

        try {
            request.body.ip_address = ip.address();
            console.log(ip.address());
            let rows = await UserRole.save(request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("UserRole-save", err);
        }

    });

    router.delete('/:id', [], async function (request, response, next) {
        try {
            request.body.ip_address = ip.address();
            console.log(ip.address());
//            let result = await UserRole.delete(request.params);
//            response.send(result);
            let rows = await UserRole.delete(request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);

        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("UserRole-delete", err);
        }
    });

    return router;
    
};