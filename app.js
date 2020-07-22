var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.route');
var auth = require('./routes/auth');


const passport = require('passport');
const session = require('express-session');


var app = express();

// add & configure middleware. express-session
app.use(
  session({

    //secret used to sign the session ID cookie
    secret: 'serversecret',
    cookie: {
      maxAge: 3600000, // 1 hour
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: true
  }))



  var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//passport, file configuration
require('./config/passport.js');


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/auth', auth);


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
