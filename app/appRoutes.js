"use strict";

angular.module('app').config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when("/HeadCount", {
            template : "<head-count-directive></head-count-directive>"
        })
        .when("/ServiceDay", {
            templateUrl : "graphs/serviceDay.html",
            controller: "serviceDayCtrl"
        })
        .when("/CustomerVisit", {
            template : "<customer-visits-directive ng-model='$parent.query.Date'></customer-visits-directive>"
        })
        .when("/Location", {
            templateUrl : "location/location.html",
            controller: "locationCtrl"
        })

    $routeProvider.otherwise({ redirectTo: '/' });

}]);