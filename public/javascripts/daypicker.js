var currentDay = 1;

var dayPicker = function() {
	var dayNum = 1;

	var daySwitcher = function(){
		var daynamesplit = $(this).text().split(" ");
		clearDay();
		currentDay = Number(daynamesplit[1]);
		setDay();
		$("#day-buttons button").removeClass("btn-primary").addClass("btn-default");
		$(this).removeClass("btn-default").addClass("btn-primary");
	}

	$("#add-day").click(function(){
		dayNum++;
		plan[dayNum] = {"Hotels":[], "Activities":[], "Restaurants":[]};
		var newButton = '<button type="button" class="btn btn-primary">Day ' + dayNum + '</button>';
		$("#day-buttons").append(newButton);
		$("#day-buttons button:last-child").click(daySwitcher).trigger(jQuery.Event("click"));
	});

	$("#day-buttons button").click(daySwitcher);

}


function clearDay() {
	$("#plan-daynum").text("");
	$("#hotel-list").text("");
	$("#activity-list").text("");
	$("#restaurant-list").text("");
	markerSet(null);
}

function setDay() {
	var deleteButton = "<button class='btn btn-warning btn-xs delete'>x</button>";

	$("#plan-daynum").text("Day " + currentDay);
	$.each(plan[currentDay].Hotels, function(key, hotel){
		$("#hotel-list").append("<li class='list-group-item'><span>" + hotel.name + "</span> " + deleteButton + "</li>");
	});	
	setDeleteButton("#hotel-list", "Hotels");

	$.each(plan[currentDay].Activities, function(key, activity){
		$("#activity-list").append("<li class='list-group-item'><span>" + activity.name + "</span> " + deleteButton + "</li>");
	});
	setDeleteButton("#activity-list", "Activities");

	$.each(plan[currentDay].Restaurants, function(key, restaurant){
		$("#restaurant-list").append("<li class='list-group-item'><span>" + restaurant.name + "</span> " + deleteButton + "</li>");
	});
	setDeleteButton("#restaurant-list", "Restaurants");

	markerSet(map);
}

function markerSet(map) {
	var day = plan[currentDay];
	for (var key in day) {
		day[key].forEach(function(thing) {
			thing.marker.setMap(map);
		})
	}
}



$(document).ready(function() {
	dayPicker();
});