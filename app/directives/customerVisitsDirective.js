"use strict";

angular.module('app').directive('customerVisitsDirective', function() {
    return {
        restrict: 'EA',
        scope: {
            model: '=ngModel'
        },
        require: '^ngModel',
        templateUrl: 'graphs/customerVisit.html',
        controller: ('inputController', ['customerVisitsService', function(scope, customerVisitsService) {

            $('#datetimepicker').datetimepicker({
                viewMode: 'days',
                format: 'DD/MM/YYYY'
            });

            scope.options = {
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
            scope.title = "Customer Visit Duration";

            scope.changeVisitDate = function(name){

                var selectedDate = scope.selected.date;

                var selectedDate = $('inputQueryDate').innerText

                customerVisitsService.visits(selectedDate).then(function(response) {
                    scope.labels = response.data[0];
                    scope.data =  response.data[1];
                });
            }
        }]),
        link: function(scope, iElement, attrs, ctrl) {

            scope.$watch('model', function() {
            scope.$eval(attrs.ngModel + ' = model');
            });

            // Send out changes from inside:
            scope.$watch(attrs.ngModel, function(val) {
                scope.model = val;
            });
        }
    };
});