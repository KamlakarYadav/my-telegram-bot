
var express = require('express');
var router = express.Router();
var ip = require("ip");
//console.log(ip.address());

module.exports = function (User, oauth, log) {

    router.get('/search', [], async function (request, response, next) {
        try {
            let result = await User.getUsers(request.params);
            response.send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("User-getUsers", err);
        }
    });

    router.get('/select/:id', [], async function (request, response, next) {
        try {
            let result = await User.getUser(request.params);
            response.send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("costSheetRepository-getUser", err);
        }
    });

    router.post('/', [], async function (request, response, next) {

        try {
            request.body.ip_address = ip.address();
            console.log(ip.address());
            let rows = await User.saveUser(request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("itemRepository-save", err);
        }

    });

    router.delete('/:id', [], async function (request, response, next) {
        try {
            request.body.ip_address = ip.address();
            console.log(ip.address());            
//            let result = await User.deleteUser(request.params);
//            response.send(result);
            let rows = await User.deleteUser(request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("User-deleteUser", err);
        }
    });

    router.post('/login/', [], async function (request, response, next) {
        try {
            request.body.ip_address = ip.address();
            console.log(ip.address());
            let result = await User.checkLogin(request.body);
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
            let result = await User.isExistingUser(request.body);
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
            let result = await User.resetPassword(request.body);
            response.status(200).send(result[0][0]);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("User-resetPassword", err);
        }

    });

    router.get('/page-rights/:id', [], async function (request, response, next) {
        try {
            let result = await User.getApplicationPageRights(request.params);
            response.send(result);
        } catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("costSheetRepository-getUser", err);
        }
    });

    return router;
};