var locations = {};
var map;
var markerList = {};
var infoWindows = [];

function newMarker(map, lati, longi, message, id) {
  var coords = { lat: lati, lng: longi };

  var button = '<br><button type="button" onClick="joinGroup(\'' + id + '\')">Join group!</button>';

  message = message + button;

  var marker = new google.maps.Marker({
    position: coords,
    map: map
  });

  var infowindow = new google.maps.InfoWindow({
    content: message
  });

  infoWindows.push(infowindow); 

  $(marker).click(function() {
    for (var i=0;i<infoWindows.length;i++) {
       infoWindows[i].close();
    }
    infowindow.open(map, marker);
  });

  marker.addListener('click', function() {
    for (var i=0;i<infoWindows.length;i++) {
       infoWindows[i].close();
    }
    infowindow.open(map, marker);
  });

  markerList[id] = marker;
}

function joinGroup(id) {
  var uniqname = getUniquename();
  console.log(uniqname);
  addGroupUser(id, uniqname);
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
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

var app = angular.module('map', []);

app.controller('sidebar',['$scope', '$http', function($scope, $http) {

  $scope.groups = {};

  var groups = firebase.database().ref('Groups').once('value').then(function(snapshot) {
    $scope.groups = snapshot.val();
    $scope.$digest();
  });

  $scope.$watch('groups', function() {
    for (var group in $scope.groups) {
      newMarker(map, $scope.groups[group].Latitude, $scope.groups[group].Longitude, $scope.groups[group].Description, group)
    }
  });

  $scope.focusMarker = function(group) {
    markerPos = {
      lat: group.Latitude,
      lng: group.Longitude
    };
    map.setCenter(markerPos);
    var key = _.findKey($scope.groups, group);

    $(markerList[key]).trigger("click");

  }
}]);