var express = require('express');
var router = express.Router();
var models = require('../models/');
var next_day_num;

/* GET days listing. */
router.get('/', function(req, res) {
	models.Day.find().populate("hotels activities restaurants").sort('day_number').exec(function(err, days) {
		if (err) res.status(500);
		next_day_num = days.length+1;
		if(!days.length) {
			models.Day.create({"day_number":next_day_num++}, function(err, newDay) {
				res.json({
					days:[newDay]
				});
			});
		} else {
			res.json({
				days:days
			});

			// We could use res.send, but we're not going to
			
		}
	});
});

/* POST to add days and attractions */
router.post('/', function(req, res) {
	models.Day.create({"day_number":next_day_num++});
	res.send('You added a day.');
})

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
			day.activities.push(req.body.attraction_id);
			day.save(function(err, day){
				res.send('You added an activity.');
			});
		});
	};
	if(req.body.attraction_type === "restaurant") {
		//FIND STUFF, such as the day
		models.Day.findOne({day_number: req.params.dayId}, function(err, day) {
			day.restaurants.push(req.body.attraction_id);
			day.save(function(err, day){
				res.send('You added a restaurant.');
			});
		});
	};
})


router.delete('/:dayId/:attraction_type/:attraction_id', function(req, res){
	console.log(req.params);
	models.Day.findOne({day_number: req.params.dayId}, function(err, day){
		var attractionId = req.params.attraction_id;
		// console.log(day);
		day[req.params.attraction_type].pull(attractionId);
		// console.log(day);
		day.save();
	});
	res.send('success!');
});


module.exports = router;
