var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var placeSchema = require('./place');

var hotelSchema = new Schema({
	name: String,
	place: [placeSchema], 
	num_stars: {type: Number, min: 1, max: 5},
	amenities: String
})

module.exports = hotelSchema;