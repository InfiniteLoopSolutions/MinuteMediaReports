"use strict";

    angular.module('app').directive('headCountDirective', function() {
        return {
            restrict: 'AEC',
            //require: '^selectedDate',
            scope: {
                title: '@',
                data: '@',
                series: '@',
                labels: '@',
                datasetOverride: '@',
                options: '@'
            },
            templateUrl: 'graphs/headCount.html',
            controller: ['$scope', '$http', function($scope, $http) {
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

                $scope.title = "this!!";

                $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
                $scope.series = ['Series A', 'Series B'];

                $scope.data = [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ];
            }],
            link: function(scope, iElement, iAttrs, ctrl) {
                //scope.getTemp(iAttrs.ngCity);
                /*scope.$watch('weather', function(newVal) {
                    // the `$watch` function will fire even if the
                    // weather property is undefined, so we'll
                    // check for it
                    if (newVal) {
                        var highs = [],
                            width   = 200,
                            height  = 80;

                        angular.forEach(scope.weather, function(value){
                            highs.push(value.temp.max);
                        });
                        // chart
                    }
                });*/
            }
        }
    });