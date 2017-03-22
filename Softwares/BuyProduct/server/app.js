var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');


var index = require('./routes/index');
var users = require('./routes/users');


var app = express();
//TODO: fix comment: Remove all un-used variables
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
mongoose.connect('mongodb://127.0.0.1:27017/buyProducts',function(error){
  if(!error){
    console.log("connection established...!");
  }
});



// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('partials',path.join(__dirname , '../client/BuyProduct/app'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//TODO: fix comment: Remove all commented codes
/*app.use('/', index);*/
//TODO: fix comment: No routing available in users.js router, so remove this
app.use('/users', users);


//set path to static files and then define the engine
console.log("............................");

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client/.tmp')));
app.use(express.static(path.join(__dirname, '../client/BuyProduct/app')));

console.log("............................");
//TODO: fix comment: Use the above "index" variable which you've initialized
require("./routes/index")(app);

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