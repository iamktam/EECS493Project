var app = angular.module('JoinMe', []);
var CONSUMER_KEY_SECRET = 'VVVnaklfRHlkc2JRdkE0TWNIUkp0dkNhZWhvYTpFczNOM05qZkNGU2hZSXBNTG5OMGtOYk5PMFFh';
var ACCESS_TOKEN = 'c933b2f342a41f349e92b5c1fccf86fe';
var user_long;
var user_lat;

var users = firebase.database().ref('Users/');

$(document).ready(function(){
    //Get User Location
    function success(pos){
      user_lat = pos.coords.latitude;
      user_long = pos.coords.longitude;
      console.log("Ready");

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
    console.log(user_long);
    console.log(user_lat);
    /*$http({
      url: 'https://api-km.it.umich.edu/token',
      method: 'POST',
      data: {'grant_type' : 'client_credentials',
             'scope' : 'PRODUCTION'},
      headers: {
        'Authorization': (('Basic ').concat(CONSUMER_KEY_SECRET)),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function successCallback(response){
        //$scope.buildingsList = response.data.Buildings.Building;
        console.log('fk');
        console.log(response);
      },function errorCallback(response){
        console.log("F");
        console.log(response);
      });*/
    $http({
      url: (('https://api-gw.it.umich.edu/Facilities/Buildings/v1/Buildings/Nearby?Latitude='.concat(user_lat)).concat('&Longitude=')).concat(user_long),
      method: 'GET',
      headers: {
        'Authorization': (('Bearer ').concat(ACCESS_TOKEN))
      }
    }).then(function successCallback(response){
        $scope.buildingsList = response.data.Buildings.Building;
      });


  }
}]);

app.controller('shareBtn', [ '$scope', '$http', function($scope, $http)
{
  $scope.clicker2 = function()
  {
    console.log("Ayy clicked");
    var uniqName = "kkuang";
    var isGL = true;
    var groupId;
    var approvalReq = true;
    var classNum;
    var location = $scope.building.Name;
    var description = $('#description'.concat($scope.building.ID)).val();
    var longitude = user_long;
    var latitude = user_lat;
    var maxSlots = $('#numSlots'.concat($scope.building.ID)).val();
    var slotsFilled = 0;
    console.log(description);
    console.log(maxSlots);
    groupId = writeGroupData($('#groupName'.concat($scope.building.ID)).val(), description, maxSlots, uniqName, user_long, user_lat);

    writeUserData("kkuang", isGL, groupId, approvalReq, "EECS 493");
  }
}])