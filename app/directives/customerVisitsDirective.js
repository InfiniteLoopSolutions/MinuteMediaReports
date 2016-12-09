"use strict";

angular.module('app').directive('customerVisitsDirective', function () {
    return {
        restrict: 'EA',
        scope: {
            model: '=ngModel'
        },
        templateUrl: 'graphs/customerVisit.html',
        controller: ('inputController', ['$scope', 'customerVisitsService', function ($scope, customerVisitsService) {

            var selected = {
                date: "28/11/2016"
            }

            $scope.selected = selected;
            // $scope.selected.date =  selected.date;

            $('#datetimepicker').datetimepicker({
                viewMode: 'days',
                format: 'DD/MM/YYYY'
            });

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
            $scope.title = "Customer Visit Duration";

            $scope.changeVisitDate = function (name) {

                var selectedDate = $scope.selected.date;

                customerVisitsService.visits(selectedDate).then(function (response) {
                    $scope.labels = response.data[0];
                    $scope.data = response.data[1];
                });
            }
        }]),
        link: function (scope, iElement, attrs, ctrl) {

        }
    };
});