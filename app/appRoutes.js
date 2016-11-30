"use strict";

angular.module('app').config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when("/line", {
            templateUrl : "graphs/line.html",
            controller: "LineCtrl"
        })
        .when("/bar", {
            templateUrl : "graphs/bar.html",
            controller: "BarCtrl"
        })
        .when("/reportOne", {
            templateUrl : "graphs/customerVisit.html",
            controller: "reportOneCtrl"
        })

    $routeProvider.otherwise({ redirectTo: '/' });

}]);