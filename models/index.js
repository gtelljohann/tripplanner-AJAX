var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripplanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var placeSchema = require('./place');
var hotelSchema = require('./hotel');
var activitySchema = require('./activity');
var restaurantSchema = require('./restaurant');

Place = mongoose.model('Place', placeSchema);
Hotel = mongoose.model('Hotel', hotelSchema);
Activity = mongoose.model('Activity', activitySchema);
Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
	Place: Place,
	Hotel: Hotel, 
	Activity: Activity,
	Restaurant: Restaurant
}

