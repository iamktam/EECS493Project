var app = angular.module('JoinMe', []);
var ACCESS_TOKEN = 'f29d938311d46ac6698ffcfdc71d01b'

app.controller('searchResult',[ '$scope', '$http', function($scope, $http)
{
  $scope.clicker = function(){
    $scope.clicked = true;
    $http({
      url: 'https://api-gw.it.umich.edu/Facilities/Buildings/v1/Buildings/Nearby?Latitude=42.275051&Longitude=-83.737589',
      method: 'GET',
      headers: {
        'Authorization': (('Bearer ').concat(ACCESS_TOKEN))
      }
    }).then(function successCallback(response){
        $scope.buildingsList = response.data.Buildings.Building;
        console.log(($scope.buildingsList).length);
      });
  }
}]);


