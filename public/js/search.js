var uniqname = getCookie("uniqnam");
console.log(uniqname);

var app = angular.module('493Search', []);

app.controller('searchResult',[ '$scope', '$http', function($scope, $http) {
    $scope.classesFound = 0;
    $scope.classesShown = 0;
    var i = 0;
    $scope.myFunc = function (event) {
        if (event.keyCode == 13) {
            //console.log("ENTER");
            //db3c4883d09c73dbb6dab71f628ce9f
            $scope.token = "db3c4883d09c73dbb6dab71f628ce9f";
            $scope.term = "2120"
            //query = "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/W16/Classes/Search/494?access_token=db3c4883d09c73dbb6dab71f628ce9f";
            //$http.get(query)
            $http({
                url: "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + $scope.term + "/Classes/Search/" + $scope.searchInput,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $scope.token
                }
            })
            .then(function(response){
                console.log(response.data);
                $scope.classList = response.data.searchSOCClassesResponse.SearchResult;
                //Get Class Infos
                $scope.classInfo = [];
                //console.log($scope.classList.length);
                //console.log($scope.classList);
                if ($scope.classList == null) {
                    //$scope.classInfo[0] = "No results found.";
                    alert("No Results Found.");
                }else if ($scope.classList.length == null) {
                    console.log("fk");
                    $scope.getSingleClassInfo();
                }else{
                    //$scope.classInfo1;
                    $scope.getClassInfo(0);
                }
                ////1-------------------------------------------------
                //$http({
                //    url: "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + $scope.term + "/Classes/" + $scope.classList[i].ClassNumber,
                //    headers: {
                //        'Accept': 'application/json',
                //        'Authorization': 'Bearer ' + $scope.token
                //    }
                //})
                //.then(function (response) {
                //    console.log(response.data);
                //    $scope.classInfo[i] = response.data.getSOCSectionListByNbrResponse.ClassOffered;
                //    i++;
                //    //2-------------------------------------------------
                //    $http({
                //        url: "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + $scope.term + "/Classes/" + $scope.classList[i].ClassNumber,
                //        headers: {
                //            'Accept': 'application/json',
                //            'Authorization': 'Bearer ' + $scope.token
                //        }
                //    })
                //    .then(function (response) {
                //        console.log(response.data);
                //        $scope.classInfo[i] = response.data.getSOCSectionListByNbrResponse.ClassOffered;
                //        i++;
                //        //3-------------------------------------------------
                //        $http({
                //            url: "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + $scope.term + "/Classes/" + $scope.classList[i].ClassNumber,
                //            headers: {
                //                'Accept': 'application/json',
                //                'Authorization': 'Bearer ' + $scope.token
                //            }
                //        })
                //        .then(function (response) {
                //            console.log(response.data);
                //            $scope.classInfo[i] = response.data.getSOCSectionListByNbrResponse.ClassOffered;
                //            i++;
                //            //4-------------------------------------------------
                //            $http({
                //                url: "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + $scope.term + "/Classes/" + $scope.classList[i].ClassNumber,
                //                headers: {
                //                    'Accept': 'application/json',
                //                    'Authorization': 'Bearer ' + $scope.token
                //                }
                //            })
                //            .then(function (response) {
                //                console.log(response.data);
                //                $scope.classInfo[i] = response.data.getSOCSectionListByNbrResponse.ClassOffered;
                //                i++;
                //                //5-------------------------------------------------
                //                $http({
                //                    url: "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + $scope.term + "/Classes/" + $scope.classList[i].ClassNumber,
                //                    headers: {
                //                        'Accept': 'application/json',
                //                        'Authorization': 'Bearer ' + $scope.token
                //                    }
                //                })
                //                .then(function (response) {
                //                    console.log(response.data);
                //                    $scope.classInfo[i] = response.data.getSOCSectionListByNbrResponse.ClassOffered;
                //                    i++;
                //                });
                //            });
                //        });
                //    });
                //});
                
            });
        }
    }

    $scope.getClassInfo = function (i) {
        var reqURL = "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + $scope.term + "/Classes/" + $scope.classList[i].ClassNumber;
        console.log(reqURL);
        $http({
            url: reqURL,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        })
        .then(function (response) {
            console.log(response.data);
            $scope.classInfo[i] = response.data.getSOCSectionListByNbrResponse.ClassOffered;
            i++;
            if ((i < 50) || (i < $scope.classList.length)) {
                $scope.getClassInfo(i);
            }
        });
    }

    $scope.getSingleClassInfo = function () {
        var reqURL = "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + $scope.term + "/Classes/" + $scope.classList.ClassNumber;
        console.log(reqURL);
        $http({
            url: reqURL,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        })
        .then(function (response) {
            console.log(response.data);
            $scope.classInfo[0] = response.data.getSOCSectionListByNbrResponse.ClassOffered;
            
        });
    }



    $scope.selectedCourse = "None";
    $scope.courseNum = "";
    $scope.selectCourse = function(x){
        console.log("Selected course = " + x.SubjectCode + " " + x.CatalogNumber + ": " + x.CourseDescr);
        $scope.selectedCourse = x.SubjectCode + " " + x.CatalogNumber + ": " + x.CourseDescr;
        $scope.courseNum = x.SubjectCode + x.CatalogNumber;
    }

    $scope.join = function (x) {
        writeUserData(uniqname, false, null, $scope.courseNum);
        console.log("Data (" + $scope.courseNum + ") written to DB.");
    }
}]);

