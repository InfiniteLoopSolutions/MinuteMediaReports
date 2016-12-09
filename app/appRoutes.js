"use strict";

angular.module('app').config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when("/HeadCount", {
            template : "<headcount-directive></headcount-directive>"
        })
        .when("/ServiceDay", {
            templateUrl : "graphs/serviceDay.html",
            controller: "serviceDayCtrl"
        })
        .when("/CustomerVisit", {
            template : "<customer-visits-directive></customer-visits-directive>"
        })
        .when("/Location", {
            templateUrl : "location/location.html"
        })

    $routeProvider.otherwise({ redirectTo: '/Location' });

}]);