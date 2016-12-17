//var directionsDisplay = new google.maps.DirectionsRenderer;
//var directionsService = new google.maps.DirectionsService;

var locations = {};

function newMarker(map, lati, longi, message) {
  var coords = { lat: lati, lng: longi };

  var button = '<br><button type="button">Join group!</button>';

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

}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat : 42.277031, lng: -83.7384387},
    zoom: 17
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

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
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

var app = angular.module('map', ["firebase"]);

app.controller('sidebar',['$scope', '$http', function($scope, $http) {

  $scope.groups = {};

  var groups = firebase.database().ref('Groups').once('value').then(function(snapshot) {
    $scope.groups = snapshot.val();
    $scope.$digest();
    console.log($scope.groups);
  });

  $scope.$watch('groups', function() {
    console.log($scope.groups.length);
    for (i = 0; i < $scope.groups.length; i++) { 
      console.log($scope.groups[i]);
    }
  });
}]);