var express = require('express');
var professors = express.Router();
var database = require('../db/db');
var cors = require('cors');
let middleware=require("./authentication");

professors.use(cors());

process.env.SECRET_KEY = "cs411fall2018";
professors.use(middleware.authentication);

// Professors create courses to "courses" table.
// POST
professors.post('/create-course', function(req, res) {
   var appData = { // response
       "error": "",
       "data": "",
   };

    var course = [req.body.crn, req.body.user_id, req.body.title, req.body.description, req.body.capacity];
    var course_sql = "insert into courses values  (?, ?, ?, ?, ?, 0)";


    var schedule1 = [req.body.crn, req.body.start_time[0], req.body.end_time[0], req.body.weekday[0], req.body.location[0]];
    var schedule1_sql = "insert into schedules (crn, start_time, end_time, weekday, location) values (?, time_format(?, '%H:%i'), time_format(?, '%H:%i'), ?,?)";

    var schedule2 = [req.body.crn, req.body.start_time[1], req.body.end_time[1], req.body.weekday[1], req.body.location[1]];
    var schedule2_sql = "insert into schedules (crn, start_time, end_time, weekday, location) values (?, time_format(?, '%H:%i'), time_format(?, '%H:%i'), ?,?)";


    database.connection.getConnection(function (err, connection) {

        connection.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            connection.query(course_sql, course, (err, rows, fields) => {
                if (err) {
                    connection.rollback(function () {
                        appData.error = err.toString();
                        appData.data = "database operation error!";
                        res.status(400).json(appData);
                    });
                } else {
                    connection.query(schedule1_sql, schedule1, (err, rows, fields) => {
                        if (err) {
                            connection.rollback(function () {
                                appData.error = err.toString();
                                appData.data = "database operation error!";
                                res.status(400).json(appData);
                            });
                        } else {
                            connection.query(schedule2_sql, schedule2, (err, rows, fields) => {
                                if (err) {
                                    connection.rollback(function () {
                                        appData.error = err.toString();
                                        appData.data = "database operation error!";
                                        res.status(400).json(appData);
                                    });
                                } else {

                                    connection.commit(function (err) {
                                        if (err) {
                                            connection.rollback(function () {
                                                return;
                                            })
                                        }
                                    });
                                    appData.data = "success";
                                    res.status(200).json(appData);
                                }
                            })
                        }
                    })
                }
            });
        });
        connection.release();
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

    var course = [req.body.user_id, req.body.title, req.body.capacity, req.body.description, req.body.crn];
    var course_sql = "update courses set user_id = ?, title = ?, capacity = ?, description = ? where crn = ?";

    var delete_param = [req.body.crn];
    var delete_sql = "delete from schedules where crn = ?";


    var schedule1 = [req.body.crn, req.body.start_time[0], req.body.end_time[0], req.body.weekday[0], req.body.location[0]];
    var schedule1_sql = "insert into schedules (crn, start_time, end_time, weekday, location) values (?, time_format(?, '%H:%i'), time_format(?, '%H:%i'), ?,?)";

    var schedule2 = [req.body.crn, req.body.start_time[1], req.body.end_time[1], req.body.weekday[1], req.body.location[1]];
    var schedule2_sql = "insert into schedules (crn, start_time, end_time, weekday, location) values (?, time_format(?, '%H:%i'), time_format(?, '%H:%i'), ?,?)";


    database.connection.getConnection(function (err, connection) {

        connection.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            connection.query(course_sql, course, (err, rows, fields) => {
                if (err) {
                    connection.rollback(function () {
                        appData.error = err.toString();
                        appData.data = "database operation error!";
                        res.status(400).json(appData);
                    });
                } else {
                    connection.query(delete_sql, delete_param, (err, rows, fields) => {
                        if(err) {
                            connection.rollback(function () {
                                appData.error = err.toString();
                                appData.data = "database operation error!";
                                res.status(400).json(appData);
                            });
                        } else {
                            connection.query(schedule1_sql, schedule1, (err, rows, fields) => {
                                if (err) {
                                    connection.rollback(function () {
                                        appData.error = err.toString();
                                        appData.data = "database operation error!";
                                        res.status(400).json(appData);
                                    });
                                } else {
                                    connection.query(schedule2_sql, schedule2, (err, rows, fields) => {
                                        if (err) {
                                            connection.rollback(function () {
                                                appData.error = err.toString();
                                                appData.data = "database operation error!";
                                                res.status(400).json(appData);
                                            });
                                        } else {

                                            connection.commit(function (err) {
                                                if (err) {
                                                    connection.rollback(function () {
                                                        return;
                                                    })
                                                }
                                            });
                                            appData.data = "success";
                                            res.status(200).json(appData);
                                        }
                                    })
                                }
                            })
                        }
                    });
                }
            });
        });
        connection.release();
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
    var sql = "select c.crn, title, enrolled_num, c.capacity, time_format(start_time, '%H:%i') as start_time, time_format(end_time, '%H:%i') as end_time, weekday, location " +
        "from enrollments e right join courses c on c.crn = e.crn, schedules s " +
        "where c.user_id = ? and c.crn = s.crn ";

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
                    appData.data[0] = {};
                    appData.data[0].crn = rows[0].crn;
                    appData.data[0].title = rows[0].title;
                    appData.data[0].enrolled_num = rows[0].enrolled_num;
                    appData.data[0].capacity = rows[0].capacity;
                    appData.data[0].description = rows[0].description;
                    appData.data[0].start_time = [rows[0].start_time, rows[1].start_time];
                    appData.data[0].end_time = [rows[0].end_time, rows[1].end_time];
                    appData.data[0].weekday = [rows[0].weekday, rows[1].weekday];
                    appData.data[0].location = [rows[0].location, rows[1].location];
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
});

module.exports = professors;