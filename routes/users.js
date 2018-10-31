var express = require('express');
var users = express.Router();
var database = require('../db/db');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var token;

users.use(cors());

process.env.SECRET_KEY = "cs411fall2018";

users.post('/register', function (req, res) {
    var today = new Date();
    var appData = {
        "error": 1,
        "data": "",
        "token": ""
    };
    var userData = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password,
        "created_at": today,
        "type":req.body.role,
        "id":req.body.netID
    };

    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('INSERT INTO users SET ?', userData, function (err, rows, fields) {
                if (!err) {
                    appData.error = 0;
                    appData["data"] = "User registered successfully";
                    res.status(201).json(appData);
                } else {
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                }
            });
            connection.release();
        }
    });
});

users.post('/login', function (req, res) {
    var appData = {};
    var netID = req.body.netID;
    var password = req.body.password;
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT * FROM users WHERE id = ?', [netID], function (err, rows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                } else {
                    if (rows.length > 0) {
                        if (rows[0].password == password) {
                            token = jwt.sign(JSON.parse(JSON.stringify(rows[0])), process.env.SECRET_KEY, {
                                expiresIn: 5000
                            });
                            appData.error = 0;
                            appData["token"] = token;
                            res.status(200).json(appData);
                        } else {
                            appData.error = 1;
                            appData["data"] = "Email and Password does not match";
                            res.status(204).json(appData);
                        }
                    } else {
                        appData.error = 1;
                        appData["data"] = "Email does not exists!";
                        res.status(204).json(appData);
                    }
                }
            });
            connection.release();
        }
    });
});

// users.use(function (req, res, next) {
//     var token = req.body.token || req.headers['token'];
//     var appData = {};
//     if (token) {
//         jwt.verify(token, process.env.SECRET_KEY, function (err) {
//             if (err) {
//                 appData["error"] = 1;
//                 appData["data"] = "Token is invalid";
//                 res.status(500).json(appData);
//             } else {
//                 next();
//             }
//         });
//     } else {
//         appData["error"] = 1;
//         appData["data"] = "Please send a token";
//         res.status(403).json(appData);
//     }
// });

// users.get('/getUsers', function (req, res) {
//
//     var appData = {};
//
//     database.connection.getConnection(function (err, connection) {
//         if (err) {
//             appData["error"] = 1;
//             appData["data"] = "Internal Server Error";
//             res.status(500).json(appData);
//         } else {
//             connection.query('SELECT *FROM users', function (err, rows, fields) {
//                 if (!err) {
//                     appData["error"] = 0;
//                     appData["data"] = rows;
//                     res.status(200).json(appData);
//                 } else {
//                     appData["data"] = "No data found";
//                     res.status(204).json(appData);
//                 }
//             });
//             connection.release();
//         }
//     });
// });

module.exports = users;
