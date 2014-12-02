var map;

function initialize_gmaps() {
  // debugger;
  // initialize new google maps LatLng object
  var myLatlng = new google.maps.LatLng(40.705051, -74.009193);

  // set the map options hash
  var mapOptions = {
    center: myLatlng,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById("map-canvas");

  // initialize a new Google Map with the options
  map = new google.maps.Map(map_canvas_obj, mapOptions);

  // Add the marker to the map
  var pinColor = "C0FFEE";
  var pinImage =  { url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
  size: new google.maps.Size(21, 34),
  origin: new google.maps.Point(0,0),
  anchor: new google.maps.Point(10, 34)};
  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Fullstack Academy",
    icon:pinImage
  });

  // Add the marker to the map by calling setMap()
  marker.setMap(map);


}

var pinColor = "2687CC";
var pinImage =  { url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
size: new google.maps.Size(21, 34),
origin: new google.maps.Point(0,0),
anchor: new google.maps.Point(10, 34)};
var markers = [];

function whereUAt() {
  markers.forEach(function(m) {
    m.setMap(null);
  })
  markers = [];
  var hotel = $("#hotel-picker option:selected").text();
  var hotel_location = finder(hotel, all_hotels);
  var hotel_marker = new google.maps.Marker({
    position: new google.maps.LatLng(hotel_location[0], hotel_location[1]),
    map: map, 
    title: hotel,
    icon:pinImage
  });
  markers.push(hotel_marker);
  var activity = $("#activity-picker option:selected").text();
  var activity_location = finder(activity, all_activities);
  var activity_marker = new google.maps.Marker({
    position: new google.maps.LatLng(activity_location[0], activity_location[1]),
    map: map, 
    title: activity,
    icon:pinImage
  });
  markers.push(activity_marker);
  var restaurant = $("#restaurant-picker option:selected").text();
  var restaurant_location = finder(restaurant, all_restaurants);
  var restaurant_marker = new google.maps.Marker({
    position: new google.maps.LatLng(restaurant_location[0], restaurant_location[1]),
    map: map, 
    title: restaurant,
    icon:pinImage
  });
  markers.push(restaurant_marker);
}

$(document).ready(function() {
  initialize_gmaps();
  whereUAt();
  $("#hotel-picker select").on('change', whereUAt);
  $("#activity-picker select").on('change', whereUAt);
  $("#restaurant-picker select").on('change', whereUAt);

});