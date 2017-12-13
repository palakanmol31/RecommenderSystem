var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/', function(req, res, next) {
    // console.log("trying to open this")
    res.sendFile(__dirname + '/admin.html');
});

var mysql = require('mysql');

var mysql_pool = mysql.createPool({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'be697a7df09361',
    password: '4c36d2e7',
    database: 'heroku_517eb00bb3dfef9'
});



/* GET users listing. */
router.get('/total_unique_users', function(req, res, next) {

    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            //    connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }

        connection.query("select count(distinct(username)) as count from login_history;", function (error, rows) {
            if (rows.length < 1) {
                console.log('There is no data');

            }

            if (rows.length > 0) {
                res.json(rows);
            }

        });
        connection.release();
    });
});

router.get('/total_time', function(req, res, next) {

    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            //    connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }


        connection.query("SELECT (sum(TIMESTAMPDIFF(SECOND, date, log_out))/3600) as count from login_history;", function (error, rows) {
            if (rows.length < 1) {
                console.log('There is no data');

            }

            if (rows.length > 0) {
                res.json(rows);
            }

        });
        connection.release();
    });
});

router.get('/date_hour/thirty', function(req, res, next) {

    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            //    connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }

        username = req.params.username;
        var current_username = req.session.username;


        connection.query("SELECT sum((TIMESTAMPDIFF(SECOND, date, log_out))/60) as hours , DATE(date) as date from login_history WHERE date between (CURDATE() - INTERVAL 1 MONTH ) and (CURDATE() + INTERVAL 1 DAY) group by DATE(date);", function (error, rows) {
            if (rows.length < 1) {
                console.log('There is no data');

            }

            if (rows.length > 0) {
                res.json(rows);
            }

        });
        connection.release();
    });
});

router.get('/date_hour/seven', function(req, res, next) {

    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            //    connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }

        username = req.params.username;
        var current_username = req.session.username;


        connection.query("SELECT sum((TIMESTAMPDIFF(SECOND, date, log_out))/60) as hours , DATE(date) as date from login_history WHERE date between (CURDATE() - INTERVAL 7 DAY) and (CURDATE() + INTERVAL 1 DAY) group by DATE(date);", function (error, rows) {
            if (rows.length < 1) {
                console.log('There is no data');

            }

            if (rows.length > 0) {
                res.json(rows);
            }

        });
        connection.release();
    });
});



module.exports = router;
