var express = require('express');
var router = express.Router();
var util = require('../libs/util');
var FoodGrade = require('../models/FoodGrade');
var multer  = require('multer')

const storage = multer.diskStorage({
    destination (req, res, cb) {
        cb(null, 'upload/');
    },
    filename (req, file, cb) {
        var dateTime = util.formatDate(new Date(), 'yyyyMMddhhmmss');
        cb(null, dateTime + file.originalname);
    }
});
const upload = multer({storage}).any();

router.put('/', upload, function (req, res, next) {
    console.log(req);
    res.json(null);
});


module.exports = router;
