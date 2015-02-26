var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({

	surl: {
		type: String,
		unique: true,
		required: true
	},
	lurl: {
		type: String,
		required: true
	}/*,
	user_id: {
		type: String,
		required: true
	}*/
});


module.exports = mongoose.model('Urlmap', urlSchema);