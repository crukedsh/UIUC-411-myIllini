var express = require('express');
var professors = express.Router();
var database = require('../db/db');
var cors = require('cors');
var jwt = require('jsonwebtoken');
const req = require('express');
var token;

professors.use(cors());

process.env.SECRET_KEY = "cs411fall2018";

// Professors create courses to "courses" table.
// POST
professors.post('/create-course', function(req, res) {
   var appData = { // response
       "error": "",
       "data": "",
   };

   var userData = { // request
       "crn": req.body.crn,
       "user_id": req.body.user_id,
       "title": req.body.title,
       "capacity": req.body.capacity,
   };

   database.connection.getConnection(function (err, connection) {
       if(err) {
           appData.error = "internal server error: database";
           res.status(500).json(appData);
       } else {
           var sql = "insert into courses set ?";
           connection.query(sql, userData, (err, rows, fields) => {
              if(err) {
                  appData.error = err.toString();
                  appData.data = "database operation error!";
                  res.status(400).json(appData);
              } else {
                  appData.data = "success";
                  res.status(200).json(appData);
              }
           });
           connection.release();
       }
   });
});

// Professors delete courses in "courses" table.
// POST
professors.post('/delete-course', function(req, res) {
    var appData = { // response
        "error": "",
        "data": "",
    };

    database.connection.getConnection(function (err, connection) {
        if(err) {
            appData.error = "internal server error: database";
            res.status(500).json(appData);
        } else {
            var sql = "delete from courses where crn = ?";
            var sqlParams = [req.body.crn];
            connection.query(sql, sqlParams, (err, rows, fields) => {
                if(err) {
                    appData.error = err.toString();
                    appData.data = "database operation error!";
                    res.status(400).json(appData);
                } else {
                    appData.data = "success";
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
});

// Professor updates course. POST
professors.post('/edit-course', function(req, res) {
    var appData = { // response
        "error": "",
        "data": "",
    };

    var sqlParams = [req.body.user_id, req.body.title, req.body.capacity, req.body.crn];
    var sql = "update courses set user_id = ?, title = ?, capacity = ? where crn = ?";

    database.connection.getConnection(function (err, connection) {
        if(err) {
            appData.error = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query(sql, sqlParams, (err, rows, fields) => {
                if(err) {
                    appData.error = err.toString();
                    appData.data = "database operation error!";
                    res.status(400).json(appData);
                } else {
                    appData.data = "success";
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
});

// Professor assign score. POST
professors.post('/assign-score', function(req, res) {
    var appData = { // response
        "error": "",
        "data": "",
    };

    var sqlParams = [req.body.grade,
        req.body.user_id,
        req.body.crn,
        req.body.type];
    var sql = "update enrollments set grade = ? where user_id = ? and crn = ? and type = ?";

    database.connection.getConnection(function (err, connection) {
        if(err) {
            appData.error = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query(sql, sqlParams, (err, rows, fields) => {
                if(err) {
                    appData.error = err.toString();
                    appData.data = "database operation error!";
                    res.status(400).json(appData);
                } else {
                    appData.data = "success";
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
});


// Professor queries course information wrt crn he teaches.
professors.post('/course-info', function(req, res) {
    var appData = { // response
        "error": "",
        "data": [],
    };

    var sqlParams = [req.body.user_id];
    var sql = "select c.crn, title, avg(grade) as avg_grade, count(e.user_id) as enrolled_num " +
        "from enrollments e right join courses c on c.crn = e.crn " +
        "where c.user_id = ? " +
        "group by c.crn";

    database.connection.getConnection(function (err, connection) {
        if(err) {
            appData.error = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query(sql, sqlParams, (err, rows, fields) => {
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

module.exports = professors;