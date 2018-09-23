var express = require('express');
var router = express.Router();
var Serial = require('../models/Serial');
var util = require('../libs/util');

router.get('/last', function (req, res, next) {
    var time = new Date().getTime();
    var dateTime = util.formatDate(new Date(time - 60 * 20 * 1000), 'yyyy-MM-dd hh:mm:ss');

    Serial.find({dateTime: {"$gt": dateTime}}, null, {sort: "-dateTime"}, (err, docs) => {
		if (err) {
			next({
				status: 500,
				message: 'server or db error'
			});
		} else {
			res.json(docs[0]);
		}
	});
});


router.post('/', function (req, res, next) {
    if (!util.isNull(req.body.data)) {
        var data = req.body.data.trim();
        var dataArr = data.split(",");
        var dateTime = util.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
        var data = {dateTime: dateTime};
        var index = 0;
        for (var key in Serial.schema.obj) {
            if (key != 'dateTime') {
                data[key] = dataArr[index];
                index++;
            }
        }
        var serial = new Serial(
            data
        );

        console.log(serial);

        serial.save((err) => {
            if (err) {
                next({
                    status: 500,
                    message: 'server or db error'
                });
            } else {
                res.json({status: 200, message: 'save status: success'});
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
