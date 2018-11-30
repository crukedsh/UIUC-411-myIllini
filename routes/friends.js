var express = require('express');
var friends = express.Router();
var database = require('../db/db');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var token;

friends.use(cors());

process.env.SECRET_KEY = "cs411fall2018";

friends.post('/request', function (req, res) {
    var today = new Date();
    var appData = {
        "error": 0,
        "data": "",
        "token": ""
    };
    var userData = req.body;
    console.log(userData);
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            return res.status(500).send(appData);
        }
        connection.query('SELECT * FROM friend_requests WHERE sender_id =?' +
            ' and receiver_id = ? and status = ?', [userData.sender_id, userData.receiver_id, "requested"],
            function (err, rows, fields) {
                if(err){
                    appData["data"] = "Error Occured!";
                    return res.status(400).json(appData);
                }

                if(rows.length > 0){
                    appData["data"] = "active same request exists";
                    return res.status(400).json(appData);
                }

                connection.query('INSERT INTO friend_requests SET ?', userData, function (err, rows, fields) {
                    if (!err) {
                        appData.error = 0;
                        appData["data"] = "Sent friend request successfully";
                        return res.status(201).json(appData);
                    } else {
                        appData["data"] = "Error Occured!";
                        res.status(400).json(appData);
                        console.log(err.message);
                    }
                });
        });
        connection.release();
    });
});


friends.get('/list/:userID', function (req, res) {
    var appData = {
        "error": 0,
        "data": "",
        "token": ""
    };
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            return res.status(500).send(appData);
        }
        connection.query('SELECT fr.*, s.first_name as sender_first_name, s.last_name as sender_last_name, ' +
            'r.first_name as receiver_first_name, r.last_name as receiver_first_name ' +
            'FROM friend_requests fr ' +
            'JOIN users s ON fr.sender_id = s.id ' +
            'JOIN users r ON fr.receiver_id = r.id ' +
            'WHERE sender_id =? or receiver_id = ?',
            [req.params.userID, req.params.userID],
            function (err, rows, fields) {
            console.log(rows);
                return res.json(rows);
            });
        connection.release();
    });
});

//
friends.post('/request/:id', function (req, res) {
    var today = new Date();
    var appData = {
        "error": 0,
        "data": "",
        "token": ""
    };
    // var userData = {
    //     status: req.body.status,
    //     id: req.param.id,
    //     userID: req.body.userID
    // };
    var userData = req.body;

    console.log(userData);
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            return res.status(500).send(appData);
        }
        connection.query('UPDATE friend_requests SET status = ? and updated_at = NOW() WHERE id = ?s',
            [userData.status, userData.id],
            function (err, rows, fields) {
                if(err){
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                    console.log(err.message);
                }else{
                    res.status(200).send("OK");
                }
        });
        connection.release();
    });
});


module.exports = friends;
