/**
 * Created by jude on 25/11/2016.
 */
"use strict";

var pieData = [];

angular.module('app').factory("DataService",[ '$q', '$timeout', '$http',
    function($q, $timeout, $http) {
        return {
            reportOne: function(id) {

                var data = {
                    queryDate:id,
                    venueid:"ac:86:74:0b:c7:08"
                };

                var config = {
                    params: data,
                    headers : {'Accept' : 'application/json'}
                };

                $http.get("/reportOne" , config)
                    .then(function(response) {
                        return pieData = response.data;
                    }, function(result) {
                        console.log("The request failed: " + result);
                    });
            }
        }}]);

var mainCtrl = function ($scope) {

    $scope.title = "";

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [[65, 59, 80, 81, 56, 55, 40, 89], [28, 48, 40, 19, 86, 27, 90, 100]];

    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };
};

angular.module('app').controller("LineCtrl", mainCtrl);

angular.module('app').controller("BarCtrl", function ($scope) {
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
});

angular.module('app').controller("reportOneCtrl", function ($scope, DataService) {

    $scope.date = new Date();

    $scope.names = [new Date().getDate(), new Date().getDate()-1,  new Date().getDate()-2
        , new Date().getDate()-3,  new Date().getDate()-4
        , new Date().getDate()-5,  new Date().getDate()-6];

    $scope.changeDate = function(selectedDay){
        DataService.reportOne(new Date().getFullYear() + "/" + (new Date().getMonth()+1) + "/" + selectedDay.selectedName);

        $scope.labels = pieData[0];
        $scope.data = pieData[1];
    };

    $scope.$on("$destroy", function(){
        clearInterval(function(){
            $scope.labels = null;
            $scope.data = null;
        });
    })
});