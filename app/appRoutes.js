"use strict";

angular.module('app').config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when("/HeadCount", {
            templateUrl : "graphs/headCount.html",
            controller: "customerHeadCountCtrl"
        })
        .when("/ServiceDay", {
            templateUrl : "graphs/serviceDay.html",
            controller: "serviceDayCtrl"
        })
        .when("/CustomerVisit", {
            templateUrl : "graphs/customerVisit.html",
            controller: "customerVisitCtrl"
        })

    $routeProvider.otherwise({ redirectTo: '/' });

}]);