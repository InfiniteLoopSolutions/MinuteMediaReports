/**
 * Created by jude on 01/12/2016.
 */
"use strict"

angular.module("app").controller("customerVisitCtrl", ["$scope", "customerVisitsService", function ($scope, customerVisitsService) {

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

    $scope.date = new Date();
    $scope.names = [28, 23];
    $scope.changeDate = function(selectedDay){
        customerVisitsService.visits($scope.selectedDate).then(function(response) {
            $scope.labels = response.data[0];
            $scope.data =  response.data[1];
        });
    };
}]);