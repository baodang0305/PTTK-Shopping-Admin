const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const validator = require('express-validator');
const mongoose = require('mongoose');

const indexRouter = require('./router/index');
const productManagementRouter = require('./router/product-management');
const customerManagementRouter = require('./router/customer-management');
const adminRouter = require('./router/admin');
const manufacturerRouter = require('./router/manufacturer-management');
const categoryRouter = require('./router/category-management');
const orderRouter = require('./router/order-management');
const chartRouter = require('./router/chart');

require('./config/passport')(passport);
const app = express();

mongoose.Promise = Promise;
const option = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: 1000000,
  reconnectInterval: 3000
};
const run = async () => {
  await mongoose.connect('mongodb+srv://BaoDang:baodang@cluster0-ek6kq.mongodb.net/pttkshoppingdb', option);
}
run().catch(error => console.error(error));

// view engine setup
app.set('views', [path.join(__dirname, 'views'), 
                  path.join(__dirname, 'views/product'),
                  path.join(__dirname, 'views/customer'),
                  path.join(__dirname, 'views/admin'),
                  path.join(__dirname, 'views/manufacturer'),
                  path.join(__dirname, 'views/category'),
                  path.join(__dirname, 'views/order')
                 ]);
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: "mysecret", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(validator());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.use('/', indexRouter);
app.use('/product', productManagementRouter);
app.use('/customer', customerManagementRouter);
app.use('/admin', adminRouter);
app.use('/manufacturer', manufacturerRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRouter);
app.use('/', chartRouter);

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
