var express = require('express');
var router = express.Router();
var Serial = require('../models/Serial');
var util = require('../libs/util');

router.get('/', function (req, res, next) {
    // Serial.find(null, null, {sort: {"no": 1}}, (err, docs) => {
	// 	if (err) {
	// 		next({
	// 			status: 500,
	// 			message: 'server or db error'
	// 		});
	// 	} else {
	// 		res.json(docs);
	// 	}
	// });
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
