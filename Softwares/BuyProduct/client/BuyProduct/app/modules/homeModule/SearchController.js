/**
 * Created by vanchanagiri shravya on 1/18/2017.
 */
(
    function(){
        angular.module('home')
            .controller("SearchController",SearchController);

        SearchController.$inject=['$http','searchService','$rootScope','$state'];

        function SearchController($http,searchService,$rootScope, $state){
            var vm = this;
            vm.allProducts=[];
            vm.getAllProducts=getAllProducts;
            getAllProducts();
            function getAllProducts(){
                searchService.getAllProducts().then(success).catch(failure);
                function success(response){
                    vm.allProducts = response.data;
                }
                function failure(failure){

                }
            }

            vm.searchedData=[];
            vm.selectedProducts=[];
            vm.refreshProds = function(valueEntered)
            {
                console.log("refresh products")
                searchService.getProducts(valueEntered).then(success).catch(failure);

                function success(response){
                    vm.searchedData = response.data;
                }

                function failure(failure){

                }
            }
            vm.addProduct=addProduct;
            function addProduct(product){
                if(!product.quantity)
                    product.quantity = 1;
                vm.selectedProducts.push(product);
                console.log(vm.selectedProducts);

            }
            vm.updateProduct=updateProduct;
            function updateProduct(data){
                for(var i=0;i<vm.allProducts.length;i++){
                    if(vm.allProducts[i]._id == data._id ){
                        data.price = data.selectedQuantity * vm.allProducts[i].price;
                    }
                }
            }
            vm.total = 0;
            vm.calculateTotal=calculateTotal;
            function calculateTotal(){
                total = 0;
                for(var i=0;i<vm.selectedProducts.length;i++){
                   total = total + vm.selectedProducts[i].price;
                }
                return total;
            }
            vm.pay=pay;
            function pay(){
                var query = {products:vm.selectedProducts};
                console.log("query");
                console.log(query);
                searchService.storeItem(query).then(success).catch(failure);

                function success(response){
                    console.log(response);
                    $state.go('bill');
                }

                function failure(failure){

                }
            }
        }
    }
)();

