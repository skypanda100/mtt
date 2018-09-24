var express = require('express');
var router = express.Router();
var Serial = require('../models/Serial');
var util = require('../libs/util');

function dilution (docs) {

}

router.get('/last', function (req, res, next) {
    var time = new Date().getTime();
    var dateTime = util.formatDate(new Date(time - 60 * 1000 * 20), 'yyyy-MM-dd hh:mm:ss');

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

router.get('/history', function (req, res, next) {
    var time = new Date().getTime();
    var dateTime = util.formatDate(new Date(time - 60 * 1000 * 60 * 6), 'yyyy-MM-dd hh:mm:ss');

    Serial.find({dateTime: {"$gt": dateTime}}, null, {sort: "+dateTime"}, (err, docs) => {
        if (err) {
            next({
                status: 500,
                message: 'server or db error'
            });
        } else {
            var json = {
                co2: [],
                hcho: [],
                temp: [],
                humidity: [],
                pm2_5: []
            };
            var count = 100;
            var co2 = {value: -999, date: ''};
            var hcho = {value: -999, date: ''};
            var temp = {value: -999, date: ''};
            var humidity = {value: -999, date: ''};
            var pm2_5 = {value: -999, date: ''};
            docs.map(doc => {
                count--;
                if (doc.co2 > co2.value) {
                    co2.value = doc.co2;
                    co2.date= doc.dateTime;
                }
                if (doc.hcho > hcho.value) {
                    hcho.value = doc.hcho;
                    hcho.date= doc.dateTime;
                }
                if (doc.temp > temp.value) {
                    temp.value = doc.temp;
                    temp.date= doc.dateTime;
                }
                if (doc.humidity > humidity.value) {
                    humidity.value = doc.humidity;
                    humidity.date= doc.dateTime;
                }
                if (doc.pm2_5 > pm2_5.value) {
                    pm2_5.value = doc.pm2_5;
                    pm2_5.date= doc.dateTime;
                }
                if (count == 0) {
                    json.co2.push(co2);
                    json.hcho.push(hcho);
                    json.temp.push(temp);
                    json.humidity.push(humidity);
                    json.pm2_5.push(pm2_5);

                    count = 100;
                    co2 = {value: -999, date: ''};
                    hcho = {value: -999, date: ''};
                    temp = {value: -999, date: ''};
                    humidity = {value: -999, date: ''};
                    pm2_5 = {value: -999, date: ''};
                }
            });
            res.json(json);
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
