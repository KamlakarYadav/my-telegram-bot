var express = require('express');
var router = express.Router();
var ip = require("ip");

module.exports = function (Users, oauth, log) {

    router.get('/all', [], async function (request, response, next) {
        try {
            let result = await Users.all(request.params);
            response.send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Users-all", err);
        }
    });

    router.get('/select/:id', [], async function (request, response, next) {
        try {
            let result = await Users.get(request.params);
            response.send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Users-get", err);
        }
    });

    router.post('/save', [], async function (request, response, next) {

        try {
            request.body.ip_address = ip.address();
            console.log(ip.address());
            let rows = await Users.save(request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Users-save", err);
        }

    });

    router.delete('/:id', [], async function (request, response, next) {
        try {
            request.body.ip_address = ip.address();
            console.log(ip.address());
//            let result = await Users.delete(request.params);
//            response.send(result);
            
            let rows = await Users.delete(request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Users-delete", err);
        }
    });

    router.post('/login/', [], async function (request, response, next) {
        try {
            request.body.ip_address = ip.address();
            console.log(ip.address());
            let result = await Users.checkLogin(request.body);
//            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result[0][0]);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("User-checkLogin", err);
        }

    });

    router.post('/already-exists/', [], async function (request, response, next) {

        try {
            request.body.ip_address = ip.address();
            console.log(ip.address());
            let result = await Users.isExistingUser(request.body);
            response.status(200).send(result[0][0]);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("User-isExistingUser", err);
        }

    });

    router.post('/reset-password/', [], async function (request, response, next) {

        try {
            request.body.ip_address = ip.address();
            console.log(ip.address());
            let result = await Users.resetPassword(request.body);
            response.status(200).send(result[0][0]);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("User-resetPassword", err);
        }

    });

    router.get('/page-rights/:id', [], async function (request, response, next) {
        try {
            let result = await Users.getApplicationPageRights(request.params);
            response.send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("costSheetRepository-getUser", err);
        }
    });

    return router;
    
};