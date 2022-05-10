var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var paketnikSchema = new Schema({
	'id' : String,
	'ulica' : String,
	'hisnaStevilka' : String,
	'postnaStevilka' : Number,
	'mesto' : String,
	'userId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
});

module.exports = mongoose.model('paketnik', paketnikSchema);
