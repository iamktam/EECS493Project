//var directionsDisplay = new google.maps.DirectionsRenderer;
//var directionsService = new google.maps.DirectionsService;

var locations = {};

function newMarker(map, lati, longi, message) {
  var coords = { lat: lati, lng: longi };

  var button = '<button type="button">Take me here!</button>';

  message = message + button;

  var infowindow = new google.maps.InfoWindow({
    content: message
  });
  var marker = new google.maps.Marker({
    position: coords,
    map: map
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
}

function updateUsers(users) {
  locations = users;
  console.log(locations);

}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat : 42.277031, lng: -83.7384387},
    zoom: 17
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  var users = firebase.database().ref('Users/').orderByChild('isGroupLeader').equalTo(true);
  users.on('value', function(snapshot) {
    updateUsers(snapshot.val());
  });
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      currPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(currPos);
      infoWindow.setContent('You are here.');
      map.setCenter(currPos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  map.setMyLocationEnabled(true);
  var msg = 'test';
  newMarker(map, 42.277543,-83.739061, msg);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, end) {
  var start = currPos;
  var end = document.getElementById('end').value;
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'WALKING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

var app = angular.module('map', []);

app.controller('sidebar',['$scope', '$http', function($scope, $http) {
}]);