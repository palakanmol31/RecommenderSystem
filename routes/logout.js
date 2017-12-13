













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
        //    connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }

        var current_username = req.session.username;
        var current_sessionID = req.session.sessionID;

        connection.query("update login_history set log_out = CURRENT_TIMESTAMP where username = '"+ current_username +"' and session_id =  '"+current_sessionID+"';");
        req.session.username = "";
        res.cookie('current_user', "");
        res.cookie('session_id', "");
        req.session.destroy();
        res.redirect('/index');

        connection.release();
    });
});
//connection.end ;
module.exports = router;







/*
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
	//req.session = null ; 
	req.session.username = "";
    res.cookie('current_user', "");
    res.cookie('session_id', "");

    res.
	req.session.destroy(); 
	res.redirect('/index');

});
module.exports = router;

*/