/**
 * Created by jude on 01/12/2016.
 */
"use strict"

angular.module("app").controller("serviceDayCtrl", ["$scope", "serviceDayService", function ($scope, serviceDayService) {

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

    $scope.names = ["7 Days", "4 Weeks", "6 Months"];

    $('#datetimepicker1').datetimepicker({
        viewMode: 'days',
        format: 'DD/MM/YYYY'
    });

    $scope.changeDate = function() {

        $scope.data = null;
        $scope.labels = null;
        $scope.series = null;

        var selectedDate = $("#thisDate").val();

        serviceDayService.day(selectedDate, $scope.selectedName).then(function(response) {
            $scope.labels = response.data[0];
            $scope.data = response.data[1];
        });
    };
}]);
