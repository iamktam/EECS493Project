var uniqName = getCookie("uniqname");
console.log(uniqName);
var app = angular.module('JoinMe', []);
var ACCESS_TOKEN = 'c933b2f342a41f349e92b5c1fccf86fe';
var user_long;
var user_lat;

var users = firebase.database().ref('Users/');

$(document).ready(function(){
    //Get User Location
    function success(pos){
      user_lat = pos.coords.latitude;
      user_long = pos.coords.longitude;
      $('#loading').hide();
      $('#showloc').show();
    }

    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("NO GO");
    }
})

app.controller('searchResult',[ '$scope', '$http', function($scope, $http)
{
  $scope.clicker = function(){
    $scope.clicked = true;

    $http({
      url: (('https://api-gw.it.umich.edu/Facilities/Buildings/v1/Buildings/Nearby?Latitude='.concat(user_lat)).concat('&Longitude=')).concat(user_long),
      method: 'GET',
      headers: {
        'Authorization': (('Bearer ').concat(ACCESS_TOKEN)),
        'Access-Control-Allow-Origin': 'https://studdy-db032.firebaseapp.com'
      }
    }).then(function successCallback(response){
        $scope.buildingsList = response.data.Buildings.Building;
      });
  }

}]);

app.controller('pop', ['$scope', '$http', function($scope, $http)
{
  $scope.populate = function(){

    $http({
      url: 'https://api-gw.it.umich.edu/Facilities/Buildings/v1/Buildings/'.concat($scope.building.ID),
      method: 'GET',
      headers: {
        'Authorization': (('Bearer ').concat(ACCESS_TOKEN)),
        'Access-Control-Allow-Origin': 'https://studdy-db032.firebaseapp.com'
      }
    }).then(function successCallback(response){
        var lat = response.data.Buildings.Building.Latitude;
        var lon = response.data.Buildings.Building.Longitude;
        $scope.building.LAT = lat;
        $scope.building.LON = lon;
        $scope.pic = 'https://maps.googleapis.com/maps/api/streetview?size=150x150&location='.concat(lat).concat(',').concat(lon).concat('&key=AIzaSyAjKAvXi5TOUrAQWmuckPqazaQEP7Yi8rA')
      });
  }
}])

app.controller('shareBtn', [ '$scope', '$http', function($scope, $http)
{
  $scope.clicker2 = function()
  {
    var isGL = true;
    var groupN = $('#groupName'.concat($scope.building.ID)).val();
    var groupId;
    var location = $scope.building.Name;
    var description = $('#description'.concat($scope.building.ID)).val();
    var longitude = parseFloat($scope.building.LON);
    var latitude = parseFloat($scope.building.LAT);
    var maxSlots = parseInt($('#numSlots'.concat($scope.building.ID)).val());

    groupId = writeGroupData(groupN, description, maxSlots, uniqName, longitude, latitude, location);
    updateJoinMeUserData(uniqName, isGL, groupId);
    window.location.href = "https://studdy-db032.firebaseapp.com/groups.html";

  }
}])