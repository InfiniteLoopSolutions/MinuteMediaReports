/**
 * Created by jude on 28/11/2016.
 */

angular.module('app').controller('CustomerController', ['DataService',
    function(DataService) {
        var vm = this;
        activate();

        function activate() {
            DataService.test()
                .then(function(results) {
                    vm.data = results;
                }, function(error) {})
                .finally(function() {

                });
        }
    }
]);
