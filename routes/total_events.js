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

router.get('/total/:html', function(req, res, next) {

    mysql_pool.getConnection(function (err, connection) {
        if (err) {
          //  connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }


        var html = req.params.html;

        console.log("check html tag " + html);
        var que = "select html, count(*) as count from logs where html = '" + html + "';";
        console.log(que);
        connection.query(que, function (error, rows) {
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

module.exports = router;
