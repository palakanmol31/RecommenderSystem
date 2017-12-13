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

router.post('/', function(req, res) {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
          //  connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }


        var html = req.body.eventInnerHTML;
        var url = req.body.eventbaseURI;
        var eventName = req.body.eventClassList;
        var eventType = req.body.eventType;
        var username = req.body.currentUser;
        var id = req.body.session;

        console.log("session id" + id);

        connection.query("insert into logs ( name, eventName, eventType , url, html, timestamp) values ( '" + username + "' , '" + eventName + "' , '" + eventType + "' ,  '" + url + "', '" + html + "' , CURRENT_TIMESTAMP )");
        res.send(200);
    connection.release();
    });

});
//connection.end ;
module.exports = router;