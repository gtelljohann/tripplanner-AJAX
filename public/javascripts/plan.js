var plan = {1:{"Hotels":[], "Activities":[], "Restaurants":[]}};


function finder(name, array) {
	var obj;
	array.forEach(function(el){
		if (el.name == name) {
			obj = el;
		}
	});
	return obj.place[0].location;
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

function addThing() {


	var deleteButton = "<button class='btn btn-warning btn-xs delete'>x</button>";

	$("#hotel-picker").submit(function(e) {
		var hotel = $("#hotel-picker option:selected").text();
		var location = finder(hotel, all_hotels);
		e.preventDefault();
		$("#hotel-list").append("<li class='list-group-item'><span>" + hotel + "</span> " + deleteButton + "</li>");
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(location[0], location[1]),
			map: map, 
			title: hotel
		});
		plan[currentDay].Hotels.push({"name": hotel, "marker":marker});
		//$.get('/'+dayid+'/attractions', callback)
		setDeleteButton("#hotel-list", "Hotels");

	})

	$("#activity-picker").submit(function(e) {
		var activity = $("#activity-picker option:selected").text();
		var location = finder(activity, all_activities);
		e.preventDefault();
		$("#activity-list").append("<li class='list-group-item'><span>" + activity + "</span> " + deleteButton + "</li>");
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(location[0], location[1]),
			map: map, 
			title: activity
		});
		plan[currentDay].Activities.push({"name": activity, "marker":marker});
		setDeleteButton("#activity-list", "Activities");
	})

	$("#restaurant-picker").submit(function(e) {
		var restaurant = $("#restaurant-picker option:selected").text();
		var location = finder(restaurant, all_restaurants);
		e.preventDefault();
		$("#restaurant-list").append("<li class='list-group-item'><span>" + restaurant + "</span> " + deleteButton + "</li>");
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(location[0], location[1]),
			map: map, 
			title: restaurant
		});
		plan[currentDay].Restaurants.push({"name": restaurant, "marker":marker});
		setDeleteButton("#restaurant-list", "Restaurants");
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
		console.log(data);
	});
}

// function writeVisitToServer(attraction_id, dayId, type_of_place) {
//   var post_data = {
//     attraction_id: attraction_id,
//     attraction_type: type_of_place
//   };
 
//   // the callback function below will be called if this request completes successfully. 
//   // the server's response to this request is passed into this callback function as "responseData"
 
//   var post_callback = function (responseData) {
//     //... what to do when done...
//   };
 
//   // jQuery Ajax call
//   $.post( "/days/" + dayId + "/attractions", post_data, post_callback);
// }


$(document).ready(function() {
	addThing();
	getDays();
});