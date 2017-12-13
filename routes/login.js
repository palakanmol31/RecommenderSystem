var express = require('express');
var router = express.Router();

var mysql = require('mysql');
/*var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'be697a7df09361',
    password: '4c36d2e7',
    database: 'heroku_517eb00bb3dfef9'
	}) ;

connection.connect(function(error){
	if(error){
		console.log('Error in db connection :' + error.stack);
		return ;
	}
	console.log('Connection was established');
});
*/
var mysql_pool = mysql.createPool({
    connectionLimit: 200,
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'be697a7df09361',
    password: '4c36d2e7',
    database: 'heroku_517eb00bb3dfef9'
});
/* Login details */
router.post('/', function(req, res) {

    mysql_pool.getConnection(function (err, connection) {
        if (err) {
          //  connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }


        var user_name = req.body.username;
        var password = req.body.password;
        console.log("User name = " + user_name + ", password is " + password);

        connection.query("SELECT * FROM user_details where username = '" + user_name + "' and password = '" + password + "';", function (error, rows) {
            if (rows.length < 1) {
                console.log('There is no data');

            }

            if (rows.length > 0) {
                //console.log(rows[0]);
                console.log("Login should be successful now");

                var id = req.sessionID;
                req.session.sessionID = id;
                console.log("session id :" + id);
                req.session.username = req.body.username;
                res.cookie('current_user', req.body.username);
                res.cookie('session_id', id);
                connection.query("insert into login_history(username, date, log_out, session_id) values ( '" + req.session.username + "' ,  CURRENT_TIMESTAMP , CURRENT_TIMESTAMP + INTERVAL 15 MINUTE ,'" + id +"');");
                res.redirect('/users');
            }
        });
        connection.release();
    });
});
//connection.end ;
module.exports = router;