var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var daySchema = new Schema({
	day_number: Number,
	hotels: [String],
	restaurants: [String],
	activities: [String]
});

module.exports = daySchema;