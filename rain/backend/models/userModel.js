var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt');


var userSchema = new Schema({
	'name' : String,
	'surname' : String,
	'email' : String,
	'username' : String,
	'password' : String,
	'phoneNumber' : String
});

userSchema.statics.authenticate = function(username, password, callback){
	User.findOne({ username: username})
		.exec(function(err, user){
			if(err){
				return callback(err);
			} else if(!user){
				var err = new Error("User not found");
				err.status = 401;
				return callback(err);
			}
			bcrypt.compare(password, user.password, function(err, result){
				if(result === true){
					return callback(null, user);
				} else{
					return callback();
				}
			});
		});
}
userSchema.statics.authenticate2 = function(username, password, callback){
	User.findOne({ username: username})
		.exec(function(err, user){
			if(err){
				return callback(err);
			} else if(!user){
				var err = new Error("User not found");
				err.status = 401;
				return callback(err);
			}
			compare(password, user.password, function(err, result){
				if(result === true){
					return callback(null, user);
				} else{
					return callback();
				}
			});
		});
}


userSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash){
		if(err){
			return next(err);
		}
		user.password = hash;
		next();
	});
});

var User = mongoose.model('User', userSchema);
module.exports = mongoose.model('user', userSchema);
