"use strict";

angular.module('app').config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when("/line", {
            templateUrl : "graphs/line.html",
            controller: "LineCtrl"
        })
        .when("/ServiceDay", {
            templateUrl : "graphs/serviceDay.html",
            controller: "ServiceDayCtrl"
        })
        .when("/reportOne", {
            templateUrl : "graphs/customerVisit.html",
            controller: "reportOneCtrl"
        })

    $routeProvider.otherwise({ redirectTo: '/' });

}]);