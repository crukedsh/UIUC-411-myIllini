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
       "data": ""
   };

    var course = [req.body.crn, req.body.user_id, req.body.title, req.body.description, req.body.capacity];
    var course_sql = "insert into courses values  (?, ?, ?, ?, ?, 0)";

    var conflict1 = [req.body.crn, req.body.weekday[0], req.body.crn,
        req.body.start_time[0], req.body.start_time[0],
        req.body.end_time[0], req.body.end_time[0]];
    var conflict2 = [req.body.crn, req.body.weekday[1], req.body.crn,
        req.body.start_time[1], req.body.start_time[1],
        req.body.end_time[1], req.body.end_time[1]];
    var conflict_sql = "insert ignore into time_conflicts " +
        "select ?, b.crn " +
        "from schedules b " +
        "where b.weekday=? and b.crn<>? and " +
        "not ((b.start_time<time_format(?, '%H:%i') " +
        "and (b.end_time<time_format(?, '%H:%i'))) " +
        "or ((b.end_time>time_format(?, '%H:%i')) " +
        "and (b.start_time>time_format(?, '%H:%i'))))";

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
                    connection.query(conflict_sql, conflict1, (err, rows, fields) => {
                        if (err) {
                            connection.rollback(function () {
                                appData.error = err.toString();
                                appData.data = "database operation error!";
                                res.status(400).json(appData);
                            });
                        } else {
                            connection.query(conflict_sql, conflict2, (err, rows, fields) => {
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
professors.post('/edit-course', function (req, res) {
    var appData = { // response
        "error": "",
        "data": "",
    };

    var course = [req.body.user_id, req.body.title, req.body.capacity, req.body.description, req.body.crn];
    var course_sql = "update courses set user_id = ?, title = ?, capacity = ?, description = ? where crn = ?";

    var deletecf_param = [req.body.crn, req.body.crn];
    var deletecf_sql = "delete from time_conflicts where crn1 = ? or crn2 = ?";

    var delete_param = [req.body.crn];
    var delete_sql = "delete from schedules where crn = ?";

    var conflict1 = [req.body.crn, req.body.weekday[0], req.body.crn,
        req.body.start_time[0], req.body.start_time[0],
        req.body.end_time[0], req.body.end_time[0]];
    var conflict2 = [req.body.crn, req.body.weekday[1], req.body.crn,
        req.body.start_time[1], req.body.start_time[1],
        req.body.end_time[1], req.body.end_time[1]];
    var conflict_sql = "insert ignore into time_conflicts " +
        "select ?, b.crn " +
        "from schedules b " +
        "where b.weekday=? and b.crn<>? and " +
        "not ((b.start_time<time_format(?, '%H:%i') " +
        "and (b.end_time<time_format(?, '%H:%i'))) " +
        "or ((b.end_time>time_format(?, '%H:%i')) " +
        "and (b.start_time>time_format(?, '%H:%i'))))";

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
                    connection.query(deletecf_sql, deletecf_param, (err, rows, fields) => {
                        if (err) {
                            connection.rollback(function () {
                                appData.error = err.toString();
                                appData.data = "database operation error!";
                                res.status(400).json(appData);
                            });
                        } else {
                            connection.query(delete_sql, delete_param, (err, rows, fields) => {
                                if (err) {
                                    connection.rollback(function () {
                                        appData.error = err.toString();
                                        appData.data = "database operation error!";
                                        res.status(400).json(appData);
                                    });
                                } else {
                                    connection.query(conflict_sql, conflict1, (err, rows, fields) => {
                                        if (err) {
                                            connection.rollback(function () {
                                                appData.error = err.toString();
                                                appData.data = "database operation error!";
                                                res.status(400).json(appData);
                                            });
                                        } else {
                                            connection.query(conflict_sql, conflict2, (err, rows, fields) => {
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
                                            })
                                        }
                                    })
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

// Professor assign score. POST
professors.post('/assign-score', function (req, res) {
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
        if (err) {
            appData.error = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query(sql, sqlParams, (err, rows, fields) => {
                if (err) {
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
professors.post('/course-info', function (req, res) {
    var appData = { // response
        "error": "",
        "data": [],
    };

    var sqlParams = [req.body.user_id];
    var sql = "select distinct c.crn, title, enrolled_num, c.capacity, description, time_format(start_time, '%H:%i') as start_time, time_format(end_time, '%H:%i') as end_time, weekday, location " +
        "from enrollments e right join courses c on c.crn = e.crn, schedules s " +
        "where c.user_id = ? and c.crn = s.crn ";

    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData.error = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query(sql, sqlParams, (err, rows, fields) => {
                if (err) {
                    appData.error = err.toString();
                    appData.data = "database operation error!";
                    res.status(400).json(appData);
                } else {
                    appData.error = "";
                    // appData
                    rows.sort((row1, row2) => row1.crn - row2.crn);
                    for (var i = 0; i < rows.length; i += 2) {
                        appData.data.push({});
                        var len = appData.data.length - 1;
                        appData.data[len].crn = rows[i].crn;
                        appData.data[len].title = rows[i].title;
                        appData.data[len].enrolled_num = rows[i].enrolled_num;
                        appData.data[len].capacity = rows[i].capacity;
                        appData.data[len].description = rows[i].description;
                        appData.data[len].start_time = [rows[i].start_time, rows[i + 1].start_time];
                        appData.data[len].end_time = [rows[i].end_time, rows[i + 1].end_time];
                        appData.data[len].weekday = [rows[i].weekday, rows[i + 1].weekday];
                        appData.data[len].location = [rows[i].location, rows[i + 1].location];
                    }
                    // appData.data = (typeof rows);
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
});

// Professor queries course roster of specific course
professors.post('/course-roster', function(req, res) {
    var appData = { // response
        "error": "",
        "data": [],
    };

    var sqlParams = [req.body.crn];
    var sql = "select e.user_id, first_name, last_name "  +
        "from enrollments e inner join users u on e.user_id = u.id " +
        "where e.crn = ? order by last_name";

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