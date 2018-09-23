var mongoose = require('mongoose');
var SerialSchema = require('../schemas/SerialSchema');
var Serial = mongoose.model('serial', SerialSchema);
module.exports = Serial;
