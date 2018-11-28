var express = require('express');
var courses = express.Router();
var database = require('../db/db');
var cors = require('cors');
var jwt = require('jsonwebtoken');
const req = require('express');
var token;

courses.use(cors());

process.env.SECRET_KEY = "cs411fall2018";

courses.post('/course-detail', function(req, res) {
    var appData = { // response
        "error": "",
        "data": [],
    };

    var sqlParams = [req.body.crn];
    var sql = "select c.crn, c.user_id, title, description, capacity, enrolled_num, schedule_id, start_time, end_time, weekday, location " +
        "from courses c inner join enrollments e on c.crn = e.crn, schedules s " +
        "where c.crn = ? and c.crn = s.crn" ;

    database.connection.getConnection(function (err, connection) {
        if(err) {
            appData.error = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query(sql, sqlParams,(err, rows, fields) => {
                if(err) {
                    appData.error = err.toString();
                    appData.data = "database operation error!";
                    res.status(400).json(appData);
                } else {
                    appData.data = rows;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
});

module.exports = courses;