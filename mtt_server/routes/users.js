var express = require('express');
var router = express.Router();
var User = require('../models/User');// 引入模型
var jwt = require('jsonwebtoken');
var config = require('../config/config');

function generateToken(data){
    let created = Math.floor(Date.now() / 1000);
    let cert = config.cert;//私钥

    let token = jwt.sign({
        data,
        exp: created + 3600 * 24 * 7
    }, cert, {algorithm: 'RS256'});

    return token;
}

router.post('/token', function (req, res, next) {
    let data = req.body;
    let {username, password} = data;
    User.findOne({
        username: username,
        password: password
    }, (err, doc) => {
        if (err) {
            next({
                status: 500,
                message:'username or password error!'
            });
        } else {
            res.json(doc);
        }
    })
});

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
