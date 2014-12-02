var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var placeSchema = require('./place');

var restaurantSchema = new Schema({
	name: String,
	place: [placeSchema],
	cuisine: String, 
	price: {type: Number, min: 1, max: 5}
})

module.exports = restaurantSchema;