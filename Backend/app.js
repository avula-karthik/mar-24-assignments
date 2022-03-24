var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var mongoose = require('mongoose');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var productsRouter = require('./routes/products');
// var forumsRouter = require('./routes/forum');
// var hobbiesRouter = require('./routes/hobbies');
// var twitterRouter = require('./routes/twitter');
var todosRouter = require('./routes/todos');
var authorRouter = require('./routes/author');
// var bookRouter = require('./routes/book');
// var mysqlRouter = require('./routes/mysql');

var app = express();
// let mongoConnUrl = 'mongodb://localhost/westsidenode';
// mongoose.connect(mongoConnUrl, { useNewUrlParser: true });
// let db = mongoose.connection;
// db.on('error', function (error) {
//     console.log('Unable to connect');
//     console.log(error);
// });
// db.on('open', function () {
//     console.log('Connected successfully...');
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/products', productsRouter);
app.use('/todomysql', todosRouter);
// app.use('/forum', forumsRouter);
// app.use('/hobbies', hobbiesRouter);
// app.use('/twitter', twitterRouter);
app.use('/authorsmysql', authorRouter);
// app.use('/book', bookRouter);
// app.use('/mysql', mysqlRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
