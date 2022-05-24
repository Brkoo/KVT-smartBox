var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var odklepSchema = new Schema({
	'username' : String,
	'paketnikId' : Number,
	'datum' : Date
});

module.exports = mongoose.model('odklep', odklepSchema);