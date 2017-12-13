var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
   // console.log("trying to open this")
    res.sendFile(__dirname + '/index.html');
});

module.exports = router;
