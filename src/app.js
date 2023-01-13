require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const methodOverride = require('method-override') // PARA UTILIZAR LOS METODOS PUT Y DELETE
const session = require('express-session')
const cors = require('cors');

const localsUserCheck=require('./middlewares/localsUserCheck')
const cookieCheck = require('./middlewares/cookieCheck');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../','public')));

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({
  secret:'hardware-assemblyforever',
  resave: false,
  saveUninitialized:true
}))
app.use(cors());
app.use(cookieCheck)
app.use(localsUserCheck)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api/users',require('./routes/APIs/apiUsers'));
app.use('/api/products',require('./routes/APIs/apiProducts'));
app.use('/api/carts',require('./routes/APIs/apiCarts'));
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

app.listen('4000', () => console.log('Servidor corriendo en el puerto 4000, TUKI'));
module.exports = app;
