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
    res.sendFile(__dirname + '/viewlogs.html');
});


router.get('/:username', function(req, res) {

    mysql_pool.getConnection(function (err, connection) {
        if (err) {
           // connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }
        var user_name = req.params.username;
       // var user_name = req.session.username;

        connection.query("SELECT * FROM logs where name = '" + user_name + "' order by timestamp desc limit 20;", function (error, rows) {
            if (rows.length < 1) {
                console.log('There is no data');

            }

            if (rows.length > 0) {
                res.send(rows);
            }
          //  connection.release();
        });
        connection.release();
    });
});
//connection.end ;
module.exports = router;