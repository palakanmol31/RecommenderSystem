var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    res.sendFile(__dirname + '/topics_charts.html');
});


module.exports = router;
