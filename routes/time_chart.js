var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var mysql_pool = mysql.createPool({
    connectionLimit: 200,
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'be697a7df09361',
    password: '4c36d2e7',
    database: 'heroku_517eb00bb3dfef9'
});

router.get('/', function(req, res, next) {

    mysql_pool.getConnection(function (err, connection) {
        if (err) {
           // connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }

        var startDate = formatDate(req.query.start);
        var endDate = formatDate(req.query.end);
        var event = req.query.event;

        var que = "select name, DATE(timestamp) as date, eventName from logs where eventName = '" + event + "' and DATE(timestamp) >= '" + startDate + "' and DATE(timestamp) <= '" + endDate + "';"
        connection.query(que, function (error, rows) {
            console.log(que);
            if (rows.length < 1) {
                console.log('There is no data');

            }

            if (rows.length > 0) {
                //console.log(rows);
                res.json(rows);
            }

        });
        connection.release();
    });
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = router;
