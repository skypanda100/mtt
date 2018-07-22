var express = require('express');
var logger = require('morgan');

var testdbRouter = require('./routes/testdb');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var foodsRouter = require('./routes/foods');
var nutritionsRouter = require('./routes/nutritions');
var ordersRouter = require('./routes/orders');

var mongoose = require('./config/mongoose.js');
var db = mongoose();

var app = express();

// 跨域设置（必须放在各个router之前）
app.all("*", function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	res.header('Access-Control-Allow-Credentials', true);// Allow Cookie
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/static', express.static('public'));
app.use('/testdb', testdbRouter);
app.use('/', indexRouter);
app.use('/foods', foodsRouter);
app.use('/users', usersRouter);
app.use('/nutritions', nutritionsRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next({
		status: 404,
		message: 'there is no such path'
	});
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status);
	res.json(err);
});

module.exports = app;
