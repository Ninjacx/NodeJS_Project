var createError = require('http-errors');
const compression = require('compression') //GZIP
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
var carRouter = require('./routes/shopCar');
var system = require('./routes/system');

var app = express();

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*") //允许跨域
  //res.header("Access-Control-Allow-Headers", "X-Requested-With")
  //res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  //res.header("X-Powered-By", ' 3.2.1')
  //res.header("Content-Type", "application/json;charset=utf-8")
  next()
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine','ejs');
app.engine('html',ejs.__express);
app.set('view engine','html');
app.use(logger('dev'));
app.use(compression({ threshold: 9 }));//GZIP
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use('/', indexRouter);
app.use('/car', carRouter);//购物车
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);
app.use('/system', system);
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/static',express.static('/public'));
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