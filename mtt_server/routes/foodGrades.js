var express = require('express');
var router = express.Router();
var util = require('../libs/util');
var FoodGrade = require('../models/FoodGrade');
var multer  = require('multer')

const nginxPath = 'D:/nginx-1.11.13/nginx-1.11.13/html/';
const storagePath = 'upload/';

const storage = multer.diskStorage({
    destination (req, res, cb) {
        cb(null, nginxPath + storagePath);
    },
    filename (req, file, cb) {
        var dateTime = util.formatDate(new Date(), 'yyyyMMddhhmmss');
        cb(null, dateTime + '-' + file.originalname);
    }
});
const upload = multer({storage}).any();

router.put('/', upload, function (req, res, next) {
    var data = req.body;
    data.imagePath = storagePath + req.files[0].filename;
    var foodGrade = new FoodGrade(
        data
    );
    foodGrade.save((err) => {
        if (err) {
            next({
                status: 500,
                message: 'server or db error'
            });
        } else {
            res.json({status: 200, message: 'save status: success'});
        }
    });
});


router.get('/', function (req, res, next) {
    var query = req.query;
    var sortStr = query.sort.substr(0, 1);
    var sort = sortStr == '-' ? -1 : 1;
    var field = query.sort.substr(1);
    var sortObj = {sort: {}};
    sortObj.sort[field] = sort;

    FoodGrade.find(null, null, sortObj, (err, docs) => {
        if (err) {
            next({
                status: 500,
                message: 'server or db error'
            });
        } else {
            res.json(docs);
        }
    });
});

module.exports = router;
