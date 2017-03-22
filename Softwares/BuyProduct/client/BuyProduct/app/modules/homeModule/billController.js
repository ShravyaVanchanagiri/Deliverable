/**
 * Created by shravya on 22/3/17.
 */
(function () {
        angular.module('buyProduct.home')
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
                    //TODO: fix comment: As you are assigning the response.data to vm.bill, you can use the vm.bill model directly
                    // No need to re-assign it to some other model again
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

