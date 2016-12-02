/**
 * Created by jude on 01/12/2016.
 */
"use strict"

angular.module("app").controller("customerVisitCtrl", ["$scope", "DataService", function ($scope, DataService) {

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

    var pieData = [];
    $scope.date = new Date();

    $scope.changeDate = function(selectedDay){
        pieData = DataService.reportOne(selectedDay.selectedName);

        $scope.labels = pieData[0];
        $scope.data = pieData[1];
    };

}]);