var express = require('express');
var students = express.Router();
var database = require('../db/db');
var cors = require('cors');
var jwt = require('jsonwebtoken');
const req = require("express");
var token;

students.use(cors());

process.env.SECRET_KEY = "cs411fall2018";

students.get('/course-selected/:userId',function (req, res){
    var appData = {
        "error": "",
        "data": []
    };
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT count(e.user_id) as enrolled_num, c.crn, title,capacity ' +
            'FROM courses c left join enrollments e on e.crn=c.crn ' +
            'WHERE c.crn in (select crn from enrollments e where e.user_id=?) ' +
            'group by c.crn ',
                [req.params.userId], function (err, rows, fields) {
                if (!err) {
                    appData.error = "";
                    appData.data = rows;
                    res.status(200).json(appData);
                } else {
                    appData.error = "Error Occured";
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                }
            });
            connection.release();
        }
    });
});

students.get('/course-unselected/:userId',function (req, res){
    var appData = {
        "error": "",
        "data": []
    };
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT count(e.user_id) as enrolled_num, c.crn, title,capacity ' +
                'FROM courses c left join enrollments e on e.crn=c.crn ' +
                'WHERE c.crn not in (select crn from enrollments e where e.user_id=?) ' +
                'group by c.crn ',
                [req.params.userId], function (err, rows, fields) {
                    if (!err) {
                        appData.error = "";
                        appData.data = rows;
                        res.status(200).json(appData);
                    } else {
                        appData.error = "Error Occured";
                        appData["data"] = "Error Occured!";
                        res.status(400).json(appData);
                    }
                });
            connection.release();
        }
    });
});

students.post('/course-register',function (req, res){
    var appData = {
        "error": "",
        "data": ""
    };
    var userData = {
        "crn": req.body.crn,
        "user_id": req.body.user_id,
        "type":"student"
    };
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query("Insert into enrollments set ?",userData,
                 function (err, rows, fields) {
                    if (!err) {
                        appData.error = "";
                        appData.data = "success";
                        res.status(200).json(appData);
                    } else {
                        appData.error = err.toString();
                        appData["data"] = "Error Occured!";
                        res.status(400).json(appData);
                    }
                });
            connection.release();
        }
    });
});

students.post('/course-drop', function (req,res) {
    var appData = {
        "error": "",
        "data": ""
    };
    var userData = {
        "crn": req.body.crn,
        "user_id": req.body.user_id,
        "type":"student" //TODO: delete this attribute
    };
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query("Delete from enrollments where crn=? and user_id=?;",[userData.crn,userData.user_id],
                function (err, rows, fields) {
                    if (!err) {
                        appData.error = "";
                        appData.data = "success";
                        res.status(200).json(appData);
                    } else {
                        appData.error = err.toString();
                        appData["data"] = "Error Occured!";
                        res.status(400).json(appData);
                    }
                });
            connection.release();
        }
    });

});

module.exports = students;
