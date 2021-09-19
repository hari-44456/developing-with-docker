const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	userid: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	interests: {
		type: String,
		required: true,
	}
});

module.exports = mongoose.model('User', userSchema);
