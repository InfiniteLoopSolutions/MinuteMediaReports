"use strict";

angular.module('app').directive('headcountDirective', [function () {
    return {
        restrict: 'EA',
        templateUrl: 'graphs/headCount.html',
        controller: ('headcountController', ['$scope', 'headCountService', function($scope, headCountService) {

            $('#datetimepicker2').datetimepicker({
                viewMode: 'days',
                format: 'DD/MM/YYYY'
            });

            var selected = {
                date : "28/11/2016"
            }

            $scope.selected = selected;

            $scope.title = "Headcount per Hour";

            $scope.changeVisitDate = function(name){
                var selectedDate = $('#thisDate').val();

                $scope.labels = [];
                $scope.series = [];
                $scope.data =  [];

                headCountService.head(selectedDate).then(function(response) {
                    $scope.labels = response.data[0];
                    $scope.series = response.data[1];
                    $scope.data =  response.data[2];
                });
            }
        }]),
        link: function(scope, iElement, attrs, ctrl) {
        }
    };
}]);