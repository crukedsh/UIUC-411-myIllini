var express = require('express');
var students = express.Router();
var database = require('../db/db');
var cors = require('cors');
let middleware=require("./authentication");

students.use(cors());

process.env.SECRET_KEY = "cs411fall2018";

students.use(middleware.authentication);

students.get('/course-selected/:userId',function (req, res){
    var appData = {
        "error": "",
        "data": []
    };

    var sql = 'SELECT DISTINCT enrolled_num, c.crn, title, capacity, description, time_format(start_time, \'%H:%i\') as start_time, time_format(end_time, \'%H:%i\') as end_time, weekday, location, schedule_id ' +
        'FROM courses c left join enrollments e on e.crn=c.crn, schedules s ' +
        'WHERE c.crn in (select crn from enrollments e where e.user_id=?) and s.crn = c.crn';

    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query(sql, [req.params.userId], function (err, rows, fields) {
                if (!err) {
                    appData.error = "";
                    // appData
                    rows.sort((row1, row2) => row1.crn - row2.crn);
                    for(var i = 0; i < rows.length; i += 2) {
                        appData.data.push({});
                        var len = appData.data.length-1;
                        appData.data[len].crn = rows[i].crn;
                        appData.data[len].title = rows[i].title;
                        appData.data[len].enrolled_num = rows[i].enrolled_num;
                        appData.data[len].capacity = rows[i].capacity;
                        appData.data[len].description = rows[i].description;
                        appData.data[len].start_time  = [rows[i].start_time, rows[i+1].start_time];
                        appData.data[len].end_time = [rows[i].end_time, rows[i+1].end_time];
                        appData.data[len].weekday = [rows[i].weekday, rows[i+1].weekday];
                        appData.data[len].location = [rows[i].location, rows[i+1].location];
                    }
                    // appData.data = (typeof rows);
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

    sql = 'SELECT DISTINCT enrolled_num, c.crn, title, capacity, description, time_format(start_time, \'%H:%i\') as start_time, ' +
        'time_format(end_time, \'%H:%i\') as end_time, weekday, location, schedule_id ' +
        'FROM courses c left join enrollments e on e.crn=c.crn, schedules s ' +
        'WHERE c.crn not in (select crn from enrollments e where e.user_id=?) and s.crn=c.crn';

    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = "internal server error: database";
            res.status(500).json(appData);
        } else {
            connection.query(sql, [req.params.userId], function (err, rows, fields) {
                    if (!err) {
                        appData.error = "";
                        // appData
                        rows.sort((row1, row2) => row1.crn - row2.crn);
                        for(var i = 0; i < rows.length; i += 2) {
                            appData.data.push({});
                            var len = appData.data.length-1;
                            appData.data[len].crn = rows[i].crn;
                            appData.data[len].title = rows[i].title;
                            appData.data[len].enrolled_num = rows[i].enrolled_num;
                            appData.data[len].capacity = rows[i].capacity;
                            appData.data[len].description = rows[i].description;
                            appData.data[len].start_time  = [rows[i].start_time, rows[i+1].start_time];
                            appData.data[len].end_time = [rows[i].end_time, rows[i+1].end_time];
                            appData.data[len].weekday = [rows[i].weekday, rows[i+1].weekday];
                            appData.data[len].location = [rows[i].location, rows[i+1].location];
                        }
                        // appData.data = (typeof rows);
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

    var userData = [req.body.user_id, req.body.crn, "student", 0];
    var enrollmentSQL = 'Insert into enrollments values (?, ?, ?, ?)';

    let checkTimeConflict = [req.body.crn, req.body.user_id, req.body.crn, req.body.user_id];
    var checkTimeConflictSQL = 'select * from enrollments e1 inner join time_conflicts t1 ' +
        'on e1.crn=t1.crn1 ' +
        'where t1.crn2=? and e1.user_id=? ' +
        'union ' +
        'select * from enrollments e2 inner join time_conflicts t2 ' +
        'on e2.crn=t2.crn2 ' +
        'where t2.crn1=? and e2.user_id=?';

    var selectSQL = 'select enrolled_num, capacity from courses where crn = ? '

    var updateParam = [req.body.crn];
    var updateSQL = 'update courses set enrolled_num = enrolled_num + 1 where crn = ?';

    var isolationLevel = 'set autocommit = 0; set global transaction isolation level serializable; set session transaction isolation level serializable;';

    database.connection.getConnection(function (err, conn) {
        conn.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            conn.query(isolationLevel, () => {
                conn.query(selectSQL, updateParam, (err, rows, fields) => {
                    if (rows[0].enrolled_num >= rows[0].capacity) {
                        conn.rollback(function () {
                            appData.error = "full";
                            appData.data = "full";
                            res.status(200).json(appData);
                            // throw "course full";
                        });
                    } else {
                        conn.query(checkTimeConflictSQL, checkTimeConflict, (err, rows, fields) => {
                            if (rows.length != 0) {
                                conn.rollback(function () {
                                    appData.error = "conflict";
                                    appData.data = "conflict";
                                    res.status(200).json(appData);
                                });
                            } else {
                                conn.query(enrollmentSQL, userData, (err, rows, fields) => {
                                    if (err) {
                                        conn.rollback(function () {
                                            appData.error = err.toString();
                                            appData.data = "database operation error!";
                                            res.status(400).json(appData);
                                        });
                                    } else {
                                        conn.query(updateSQL, updateParam, (err, rows, fields) => {
                                            if (err) {
                                                conn.rollback(function () {
                                                    appData.error = err.toString();
                                                    appData.data = "database operation error!";
                                                    res.status(400).json(appData);
                                                });
                                            } else {
                                                conn.query(selectSQL, updateParam, (err, rows, fields) => {
                                                    if (rows[0].enrolled_num > rows[0].capacity) {
                                                        conn.rollback(function () {
                                                            appData.error = "full";
                                                            appData.data = "full";
                                                            res.status(200).json(appData);
                                                            // throw "course full";
                                                        });
                                                    } else {
                                                        conn.commit(function (err) {
                                                            if (err) {
                                                                conn.rollback(function () {
                                                                    return;
                                                                })
                                                            }
                                                        });
                                                        appData.data = "success";
                                                        res.status(200).json(appData);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                });
            });
        });
        conn.release();
    });

});

students.post('/course-drop', function (req,res) {
    var appData = {
        "error": "",
        "data": ""
    };
    var userData = [req.body.crn, req.body.user_id];

    var enrollmentSQL = 'Delete from enrollments where crn=? and user_id=?;';

    var updateParam = [req.body.crn];
    var updateSQL = 'update courses set enrolled_num = enrolled_num - 1 where crn = ?';

    database.connection.getConnection(function (err, conn) {
        conn.beginTransaction(function (err) {
            if (err) {
                throw err;
            }

            conn.query(enrollmentSQL, userData, (err, rows, fields) => {
                if (err) {
                    conn.rollback(function () {
                        appData.error = err.toString();
                        appData.data = "database operation error!";
                        res.status(400).json(appData);
                    });
                } else {
                    conn.query(updateSQL, updateParam, (err, rows, fields) => {
                        if (err) {
                            conn.rollback(function () {
                                appData.error = err.toString();
                                appData.data = "database operation error!";
                                res.status(400).json(appData);
                            });
                        } else {
                            conn.commit(function (err) {
                                if (err) {
                                    conn.rollback(function () {
                                        return;
                                    })
                                }
                            });
                            appData.data = "success";
                            res.status(200).json(appData);
                        }
                    });
                }
            });
            conn.release();
        });
    });

});

module.exports = students;
