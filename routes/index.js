var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
	models.Hotel.find(function(err, hotels) {
		models.Restaurant.find(function(err, restaurants) {
			models.Activity.find(function(err, activities) {
				res.render('index', 
					{ hotels:hotels, restaurants:restaurants, 
						activities:activities, title: 'Trip Planner' });
			});
		});

	});
});

module.exports = router;
