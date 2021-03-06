var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var placeSchema = require('./place');

var activitySchema = new Schema({
	name: String, 
	place: [placeSchema],
	age_range: String
})

module.exports = activitySchema;