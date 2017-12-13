var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login'); 
var logevents = require('./routes/logevents');
var signup= require('./routes/signup'); 

var logout = require('./routes/logout');
var logactions = require('./routes/logactions');
var viewlogs = require('./routes/viewlogs');
var charts = require('./routes/charts');
var dropdown_events = require('./routes/dropdown_events');
var time_chart = require('./routes/time_chart');
var logs = require('./routes/logs');
var topic_charts = require('./routes/topics_charts');
var total_events = require('./routes/total_events');
var admin  = require('./routes/admin');
var recommender = require('./routes/recommender');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//
app.use(session({ secret: 'secret-token', cookie: { httpOnly: false , sameSite: false,  maxAge: 60000 }}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/index', index);
app.use('/signup', signup); 
app.use('/login', login);
app.use('/users', users);
app.use('/logevents', logevents);
app.use('/logout' , logout);
app.use('/logactions' , logactions);
app.use('/viewlogs', viewlogs);
app.use('/charts', charts);
app.use('/dropdown_events', dropdown_events);
app.use('/time_chart', time_chart);
app.use('/logs', logs);
app.use('/topics_charts', topic_charts);
app.use('/total_events', total_events);
app.use('/admin', admin);
app.use('/recommender', recommender);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
