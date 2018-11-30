var express = require('express');
var forum = express.Router();
var database = require('../db/db');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var token;
let middleware=require("./authentication")

forum.use(cors());
forum.use(middleware.authentication);

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

forum.delete('/post/:post_id',function (req, res) {
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
            connection.query('delete from posts where post_id= ? ', req.params.post_id, function (err, rows, fields) {
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
        connection.query('SELECT * FROM posts WHERE crn= ? order by is_top desc, created_at desc ', req.params.crn, function (err, rows, fields) {
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

forum.get('/search/:keyword', function (req, res) {
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
        connection.query('SELECT * FROM posts WHERE MATCH (title,content) AGAINST (? IN NATURAL LANGUAGE MODE)', req.params.keyword, function (err, rows, fields) {
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

forum.get('/search-slow/:keyword', function (req, res) {
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
        connection.query(`SELECT * FROM posts WHERE content like '%${req.params.keyword}%' or title like '%${req.params.keyword}%'` , function (err, rows, fields) {
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

forum.post('/review', function (req, res) {
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
            connection.query('INSERT INTO reviews SET ?', req.body, function (err, rows, fields) {
                if (!err) {
                    appData.error = "";
                    appData.data = "New Review Added";
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

forum.put('/review',function (req, res) {
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
            connection.query('UPDATE reviews SET ? where review_id= ? ', [req.body,req.body.review_id], function (err, rows, fields) {
                if (!err) {
                    appData.error = "";
                    appData.data = "Review Edited";
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

forum.delete('/review/:review_id',function (req, res) {
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
            connection.query('delete from reviews where review_id= ? ', req.params.review_id, function (err, rows, fields) {
                if (!err) {
                    appData.error = "";
                    appData.data = "Review deleted";
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


forum.get('/review/:post_id', function (req, res) {
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
        connection.query('SELECT * FROM reviews WHERE post_id= ? order by created_at desc ', req.params.post_id, function (err, rows, fields) {
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
