var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var daySchema = new Schema({
// 	day_number: Number,
// 	hotels: [String],
// 	restaurants: [String],
// 	activities: [String]

var daySchema = new Schema({
  day_number: Number,
  hotels: [{type: Schema.Types.ObjectId, ref: 'Hotel'}],
  restaurants: [{type: Schema.Types.ObjectId, ref: 'Restaurant'}],
  activities: [{type: Schema.Types.ObjectId, ref: 'Activity'}]
});

module.exports = daySchema;