/**
 * Created by shravya on 22/3/17.
 */
(function () {
        angular.module('home')
            .controller("billController", billController);

        billController.$inject = ['$http', 'searchService', '$rootScope', '$state', '$stateParams'];

        function billController($http, searchService, $rootScope, $state, $stateParams) {
            var vm = this;
            vm.bill = {};
            vm.getBill = getBill;
            getBill();
            function getBill() {
                var query = {
                    "billId": $stateParams.billId
                }
                searchService.getBill(query).then(success).catch(failure);
                function success(response) {
                    vm.bill = response.data;
                    vm.purchasedBy = vm.bill.purchasedBy;
                    vm.purchasedOn = vm.bill.purchasedOn;
                    vm.total = vm.bill.total;
                }

                function failure(failure) {
                    console.log(failure);
                }
            }
        }
    })();

