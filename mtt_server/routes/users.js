var express = require('express');
var router = express.Router();
var User = require('../models/User');// 引入模型

/* GET users listing. */
router.get('/', function (req, res, next) {
	User.findOne({ //查找一条
		username: 'admin',
		password: '123'
	}, (err, doc) => {
		if (err) {
			next({
				status: 500,
				message:'server or db error'
			});
		} else {
			res.json(doc);
		}
	})
});

module.exports = router;
