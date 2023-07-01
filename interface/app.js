var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const generic = require('./callbacks/generic')

var indexRouter = require('./routes/index');
var ruasRouter = require('./routes/ruas');
var authRouter = require('./routes/auth');
var postsRouter = require('./routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', generic.verifyToken, indexRouter);
app.use('/ruas', generic.verifyToken, ruasRouter, generic.awaitPromise ,generic.handleResponse)
app.use('/auth', authRouter)
app.use('/posts', generic.verifyToken, postsRouter, generic.awaitPromise ,generic.handleResponse)

app.use('/imagens', express.static("uploads/imagens"))

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
  console.log("Error: " + err)
  res.render('error', { error: err.message });
});

module.exports = app;
