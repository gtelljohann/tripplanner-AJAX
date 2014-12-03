var plan = {};


function finder(name, array) {
	var obj;
	array.forEach(function(el){
		if (el.name == name) {
			obj = el;
		}
	});
	return obj.place[0].location;
}

function findById(id, array) {
	var obj;
	id = id.replace(/"/g, '');
	array.forEach(function(el){
		if (el._id == id) {
			obj = el;
		}
	});
	return obj;
}

function findAndDelete(name, array) {
	var obj;
	array.forEach(function(el, index, full_arr){
		if (el.name == name) {
			el.marker.setMap(null);
			full_arr.splice(index, 1);
		}
	});
}
var deleteButton = "<button class='btn btn-warning btn-xs delete'>x</button>";

function addHotel(hotel, hotel_id){
    var location = finder(hotel, all_hotels);
    $("#hotel-list").append("<li class='list-group-item'><span>" + hotel + "</span> " + deleteButton + "</li>");
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location[0], location[1]),
        map: map, 
        title: hotel
    });
    plan[currentDay].Hotels.push({"name": hotel, "marker":marker});
    setDeleteButton("#hotel-list", "Hotels");
}

function addActivity (activity, activity_id){
    var location = finder(activity, all_activities);
    $("#activity-list").append("<li class='list-group-item'><span>" + activity + "</span> " + deleteButton + "</li>");
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location[0], location[1]),
        map: map, 
        title: activity
    });
    plan[currentDay].Activities.push({"name": activity, "marker":marker});
    setDeleteButton("#activity-list", "Activities");
}

function addRestaurant(restaurant, restaurant_id) {
    var location = finder(restaurant, all_restaurants);
    $("#restaurant-list").append("<li class='list-group-item'><span>" + restaurant + "</span> " + deleteButton + "</li>");
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location[0], location[1]),
        map: map, 
        title: restaurant
    });
    plan[currentDay].Restaurants.push({"name": restaurant, "marker":marker});
    setDeleteButton("#restaurant-list", "Restaurants");
}

function addThing() {


	    $("#hotel-picker").submit(function(e) {
	        var thisHotel = $("#hotel-picker option:selected").text();
	        //Probably not worth getting rid of right now..
	        var thisHotel_id = $("#hotel-picker option:selected").attr("id").replace(/"/g, '');
	        e.preventDefault();
	        addHotel(thisHotel, thisHotel_id);
	        writeVisitToServer(thisHotel_id, currentDay, "hotel");
	    });

	    $("#activity-picker").submit(function(e) {
	        var thisActivity = $("#activity-picker option:selected").text();
	        var thisActivity_id = $("#activity-picker option:selected").attr("id").replace(/"/g, '');
	        e.preventDefault();
	        addActivity(thisActivity, thisActivity_id);
	        writeVisitToServer(thisActivity_id, currentDay, "activity");
	    })


	    $("#restaurant-picker").submit(function(e) {
	        var thisRestaurant = $("#restaurant-picker option:selected").text();
	        var thisRestaurant_id = $("#restaurant-picker option:selected").attr("id").replace(/"/g, '');
	        e.preventDefault();
	        addRestaurant(thisRestaurant, thisRestaurant_id);
	        writeVisitToServer(thisRestaurant_id, currentDay, "restaurant");        
	    })


}

function setDeleteButton(listId, listName) {
	$(listId + " .delete").click(function() {
		var parent = $(this).parent();
		var name = parent.find("span").text();
		findAndDelete(name, plan[currentDay][listName]);
		parent.remove();
	});
}

function getDays() {

	$.get('/days/', function(data) {
		data.days.forEach(function(day){
			addDay();
			day.hotels.forEach(function(hotel){
				var hotelObj = findById(hotel, data.hotels);
				console.log(hotel);
				addHotel(hotelObj.name, hotelObj._id);
			});				
			day.activities.forEach(function(activity){
				var activityObj = findById(activity, data.activities);
				addActivity(activityObj.name, activityObj._id);
			});				
			day.restaurants.forEach(function(restaurant){
				var restaurantObj = findById(restaurant, data.restaurants);
				addRestaurant(restaurantObj.name, restaurantObj._id);
			});	
		});
		$("#day-buttons").children().first().click();
	});
}

function writeVisitToServer(attraction_id, dayId, type_of_place) {
	var post_data = {
		attraction_id: attraction_id,
		attraction_type: type_of_place
	};

  // the callback function below will be called if this request completes successfully. 
  // the server's response to this request is passed into this callback function as "responseData"

  var post_callback = function (responseData) {
    //... what to do when done...
    // alert("We added the thing!");
};

  // jQuery Ajax call
  $.post( "/days/" + dayId + "/attractions", post_data, post_callback);
}


$(document).ready(function() {
	addThing();
	getDays();
});