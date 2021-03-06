var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
var config = require('./config');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var collegeRouter = require('./routes/college');
var studentRouter = require('./routes/student');
var chartDataRouter = require('./routes/chartData');
var crxRouter = require('./routes/crx');


const MONGOURL = config.MONGOURL;
const connect = mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

connect.then((db) => {
  console.log("Connected correctly to the Database Server");
}, (err) => { console.log(err); });



var app = express();
app.use(cors()); // disable cors protection
app.disable('etag'); // disable caching for HTTP 304 responses 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/college', collegeRouter);
app.use('/student', studentRouter);
app.use('/chartData', chartDataRouter);
app.use('/crx', crxRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
