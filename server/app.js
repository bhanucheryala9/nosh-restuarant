var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
<<<<<<< HEAD
var cors = require('cors')
var bodyParser = require("body-parser")

const mongoose = require("mongoose");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin-router')
var customerRouter = require('./routes/customer-router')
var app = express();


const uri =
  "mongodb+srv://bcheryala:bhanucheryala@se-assignment-2.45lwac2.mongodb.net/nosh?retryWrites=true&w=majority";

mongoose.connect(
  uri, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


=======

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

>>>>>>> repo-b/main
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(cors())
=======
app.use(logger('dev'));
app.use(express.json());
>>>>>>> repo-b/main
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/api/admin', adminRouter);
app.use('/api/customer', customerRouter);
=======
>>>>>>> repo-b/main

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
