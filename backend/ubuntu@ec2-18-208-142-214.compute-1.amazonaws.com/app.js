var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var songsRouter = require('./routes/song');
var singerRouter = require('./routes/singer')
var searchRouter = require('./routes/search')
var quickRouter = require('./routes/know')



const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


let connection;

try {
    connection =  oracledb.getConnection(  {
        user          : "admin",
        password      : "cis550blah",
        connectString : "cis550project.cwunoqbz1ywm.us-east-2.rds.amazonaws.com/CIS550PJ"
    });

} catch (err) {
    console.error(err);
}
//require('./routes/html-routes')(app, connection);



var app = express();
var bodyParser = require('body-parser')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/songs', songsRouter);
app.use('/singers', singerRouter);
app.use('/search', searchRouter);
app.use('/quick', quickRouter);


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
