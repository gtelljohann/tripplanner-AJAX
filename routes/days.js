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
				models.Hotel.find(function(err, hotels) {
				models.Activity.find(function(err, activities) {
					models.Restaurant.find(function(err, restaurants) {
						res.json({
							days:[newDay],
							hotels:[],
							activities:[],
							restaurants:[]
						});
					})
				})
			})
			});
		} else {
			models.Hotel.find(function(err, hotels) {
				models.Activity.find(function(err, activities) {
					models.Restaurant.find(function(err, restaurants) {
						res.json({
							days:days,
							hotels:hotels,
							activities:activities,
							restaurants:restaurants
						});
					})
				})
			})


			// We could use res.send, but we're not going to
			
		}
	});
});

/* POST to add days and attractions */
router.post('/', function(req, res) {
	models.Day.create({"day_number":next_day_num++});
})

// Option 1
router.post('/:dayId/attractions', function(req,res){

})

// Option 2
router.post('/:dayId/hotels/', function(req,res){

})

router.post('/:dayId/activities', function(req,res){

})

router.post('/:dayId/restaurants', function(req,res){

})

module.exports = router;
