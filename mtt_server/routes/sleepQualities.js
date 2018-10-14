var express = require('express');
var router = express.Router();
var SleepQuality = require('../models/SleepQuality');
var util = require('../libs/util');

router.post('/', function (req, res, next) {
	if (!util.isNull(req.body)) {
		let data = req.body;
		SleepQuality.remove({user: data.user, sleepDate : data.sleepDate}, function (err, resp) {
			if (err) {
				next({
					status: 500,
					message: 'server or db error'
				});
			} else {
				var sq = new SleepQuality(
					data
				);
				sq.save((err) => {
					if (err) {
						next({
							status: 500,
							message: 'server or db error'
						});
					} else {
						res.json({status: 200, message: 'save status: success'});
					}
				});
			}
		});

	} else {
		next({
			status: 500,
			message: 'argument error'
		});
	}
});

module.exports = router;
