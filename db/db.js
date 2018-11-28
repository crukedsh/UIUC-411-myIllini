var mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit: 100,
    host:'localhost',
    user:'root',
    password:'123456',
    database:'cs411',
    port: 3306,
    debug: true,
    multipleStatements: true
});
module.exports.connection = connection;