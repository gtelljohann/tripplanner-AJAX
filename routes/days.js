var express = require('express');
var router = express.Router();
var models = require('../models/');
var next_day_num;

/* GET days listing. */
router.get('/', function(req, res) {
	models.Day.find(function(err, days) {
		if (err) res.status(500);
		next_day_num = days.length+1;
		if(!days.length) {
			models.Day.create({"day_number":next_day_num++}, function(err, newDay) {
				res.json({
					days:[newDay]
				});
			});
		} else {
			// We could use res.send, but we're not going to
			res.json({
				days:days
			});
		}
	});
});

/* POST to add days and attractions */
router.post('/', function(req, res) {
	models.Day.create({"day_number":next_day_num++});
})

// Option 1
router.post('/:dayId/attractions', function(req,res){
	if(req.body.attraction_type === "hotel") {
		//FIND STUFF, such as the day
		models.Day.findOne({day_number: req.params.dayId}, function(err, day) {
			day.hotels.push(req.body.attraction_id);
			day.save(function(err, day){
				res.send('You added a hotel.');
			});
		});
	};
	if(req.body.attraction_type === "activity") {
		//FIND STUFF, such as the day
		models.Day.findOne({day_number: req.params.dayId}, function(err, day) {
			day.hotels.push(req.body.attraction_id);
			day.save(function(err, day){
				res.send('You added an activity.');
			});
		});
	};
	if(req.body.attraction_type === "restaurant") {
		//FIND STUFF, such as the day
		models.Day.findOne({day_number: req.params.dayId}, function(err, day) {
			day.hotels.push(req.body.attraction_id);
			day.save(function(err, day){
				res.send('You added a restaurant.');
			});
		});
	};
})

// Option 2
router.post('/:dayId/hotels/', function(req,res){

})

router.post('/:dayId/activities', function(req,res){

})

router.post('/:dayId/restaurants', function(req,res){

})

module.exports = router;
