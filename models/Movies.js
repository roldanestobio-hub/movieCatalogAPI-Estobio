const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

	title: {type: String, required: [true, "Movie name is Required"]},
	director: {type: String, required: [true, "Director name is Required"]},
	description: {type: String, required: [true, "Description is Required"]},
	year: {type: Number, required: [true, "Year is Required"]},
	genre: {type: String, required: [true, "Genre is Required"]},
	comments: [{
		userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},	
		comment: {type: String, required: false},
		date: {type: Date, default: Date.now}
	}]
})

module.exports = mongoose.model('Movies', movieSchema);