var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

const indexRouter = require('./routes/index')
const ruasRouter = require('./routes/ruas')
const imagensRouter = require('./routes/imagens')
const casasRouter = require('./routes/casas')
const lugaresRouter = require('./routes/lugares')
const entidadesRouter = require('./routes/entidades')
const enfiteutasRouter = require('./routes/enfiteutas')
const datasRouter = require('./routes/datas')


// Connection to MongoDB

var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URL || 'mongodb://localhost:27017/MRB';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.on('open', function() { console.log("MongoDB connection successful") })

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter)
app.use('/api/ruas', ruasRouter)
app.use('/api/imagens', imagensRouter)
app.use('/api/casas', casasRouter)
app.use('/api/lugares', lugaresRouter)
app.use('/api/entidades', entidadesRouter)
app.use('/api/enfiteutas', enfiteutasRouter)
app.use('/api/datas', datasRouter)


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
  res.status(err.status || 500).jsonp({ error: err.message })
  console.log("Error: " + err.message);
});

module.exports = app;
