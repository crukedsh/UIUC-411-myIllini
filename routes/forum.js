var express = require('express');
var forum = express.Router();
var database = require('../db/db');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var token;
let middleware=require("./authentication")

forum.use(cors());
//forum.use(middleware.authentication);

process.env.SECRET_KEY = "cs411fall2018";

forum.post('/post', function (req, res) {
    let appData = {
        error: "",
        data: "",
    };

    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData.error = err.toString();
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('INSERT INTO posts SET ?', req.body, function (err, rows, fields) {
                if (!err) {
                    appData.error = "";
                    appData.data = "New Posts Added";
                    res.status(201).json(appData);
                } else {
                    appData.error=err.toString();
                    res.status(400).json(appData);
                }
            });
            connection.release();
        }
    });
});

forum.put('/post',function (req, res) {
    let appData = {
        error:"",
        data:"",
    };

    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData.error = err.toString();
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('UPDATE posts SET ? where post_id= ? ', [req.body,req.body.post_id], function (err, rows, fields) {
                if (!err) {
                    appData.error = "";
                    appData.data = "Post Edited";
                    res.status(201).json(appData);
                } else {
                    appData.error=err.toString();
                    res.status(400).json(appData);
                }
            });
            connection.release();
        }
    });
});


forum.get('/post/:crn', function (req, res) {
    let appData = {
        error:"",
        data:"",
    };
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData.error = err.toString();
            appData.data = "Internal Server Error";
            res.status(500).json(appData);
            return;
        }
        connection.query('SELECT * FROM posts WHERE crn= ? order by created_at desc ', req.params.crn, function (err, rows, fields) {
            if (err) {
                appData.error = err.toString();
                appData.data = "Error occurred!";
                res.status(400).json(appData);
                return;
            }
            appData.data=rows;
            res.status(200).json(appData);

        });
        connection.release();

    });
});


module.exports = forum;
