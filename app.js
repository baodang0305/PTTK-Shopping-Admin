var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./controller/index');
var inboxRouter = require('./controller/inbox');
var galleryRouter = require('./controller/gallery');
var chartRouter = require('./controller/chart');
var shortCodeRouter = require('./controller/short-code');
var erroPageRouter = require('./controller/erro-page');
var UIComponentRouter = require('./controller/UI-component');
var tableRouter = require('./controller/table');
var pageRouter = require('./controller/page');
var formRouter = require('./controller/form');
var mapRouter = require('./controller/map');

//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/map'), path.join(__dirname, 'views/form'), path.join(__dirname, 'views/page'), path.join(__dirname, 'views/table'), path.join(__dirname, 'views/UIComponent'), path.join(__dirname, 'views/inbox'), path.join(__dirname, 'views/gallery'), path.join(__dirname, 'views/charts'), path.join(__dirname, 'views/shortCode'), path.join(__dirname, 'views/erroPage')]);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.use('/', indexRouter);
app.use('/', inboxRouter);
app.use('/', galleryRouter);
app.use('/', chartRouter);
app.use('/', shortCodeRouter);
app.use('/', erroPageRouter);
app.use('/', UIComponentRouter);
app.use('/', tableRouter);
app.use('/', pageRouter);
app.use('/', formRouter);
app.use('/', mapRouter);
//app.use('/users', usersRouter);

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
