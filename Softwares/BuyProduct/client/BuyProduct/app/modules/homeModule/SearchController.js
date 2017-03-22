/**
 * Created by vanchanagiri shravya on 1/18/2017.
 */
(function () {
    angular.module('home')
        .controller("SearchController", SearchController);

    SearchController.$inject = ['$http', 'searchService', '$rootScope', '$state', 'NgTableParams'];

    function SearchController($http, searchService, $rootScope, $state, NgTableParams) {
        var vm = this;
        vm.allProducts = [];
        vm.getAllProducts = getAllProducts;
        getAllProducts();
        function getAllProducts() {
            searchService.getAllProducts().then(success).catch(failure);
            function success(response) {
                vm.allProducts = response.data;
            }

            function failure(failure) {

            }
        }

        loadTable();
        function loadTable() {
            vm.tableParams = new NgTableParams({}, {
                getData: function (params) {
                    console.log(vm.data);
                    vm.data = vm.selectedProducts.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    return vm.data;
                }
            });
        }

        vm.searchedData = [];
        vm.selectedProducts = [];
        vm.data = [];
        vm.refreshProds = function (valueEntered) {
            console.log("refresh products")
            searchService.getProducts(valueEntered).then(success).catch(failure);

            function success(response) {
                vm.searchedData = response.data;
            }

            function failure(failure) {

            }
        }


        vm.addProduct = addProduct;
        function addProduct(product) {
            if (!product.quantity)
                product.quantity = 1;
            vm.selectedProducts.push(product);
            console.log(vm.selectedProducts);
            vm.tableParams.reload();

        }

        vm.updateProduct = updateProduct;
        function updateProduct(data) {

            for (var i = 0; i < vm.allProducts.length; i++) {
                if (vm.allProducts[i]._id == data._id) {
                    data.price = data.quantity * vm.allProducts[i].price;
                }
            }
        }

        vm.total = 0;
        vm.calculateTotal = calculateTotal;
        function calculateTotal() {
            //TODO: fix comment: What is this variable? global or local or controller specific?
            total = 0;
            for (var i = 0; i < vm.selectedProducts.length; i++) {
                total = total + vm.selectedProducts[i].price;
            }
            return total;
        }

        vm.pay = pay;
        function pay() {
            var query = {products: vm.selectedProducts};
            console.log("query");
            console.log(query);
            searchService.storeItem(query).then(success).catch(failure);

            function success(response) {
                console.log("bill data: ", response.data);
                var billId = response.data;
                $state.go('bill', {billId: billId});
            }

            function failure(failure) {

            }
        }
    }
})();

