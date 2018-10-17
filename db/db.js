var mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit: 100,
    host:'localhost',
user:'chenzhu2_dev',
password:'exciting!',
database:'chenzhu2_cs411',
port: 3306,
    debug: true,
    multipleStatements: true
});
module.exports.connection = connection;