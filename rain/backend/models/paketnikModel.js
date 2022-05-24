var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paketnikSchema = new Schema({
	'id' : String,
	'ulica' : String,
	'hisnaStevilka' : String,
	'postnaStevilka' : Number,
	'mesto' : String,
	'ownerId' : { //prijavljen user
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	'users' : [String]
});

module.exports = mongoose.model('paketnik', paketnikSchema);
