var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
	address: String,
	city: String, 
	state: String, 
	phone: String,
	location: [Number, Number]
})

module.exports = placeSchema;