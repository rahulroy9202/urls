var mongoose = require('mongoose');

var urlMapSchema = mongoose.Schema({

	surl: {
		type: [String],
		unique: true
	},
	
	lurl: {
		type: String,
		required: true
	},
	
	user_id: {
		type: String,
		required: true
	}
});


module.exports = mongoose.model('Urlmap', urlMapSchema);