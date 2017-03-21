/**
 * Created by vanchanagiri shravya on 1/18/2017.
 */
(
    function(){
        angular.module('home')
            .service("searchService",searchService);


        searchService.$inject=['$http','api','$q','$rootScope'];

        function searchService($http,api,$q,$rootScope){
            var searchService={
                getProducts:getProducts,
                getAllProducts:getAllProducts,
                storeItem:storeItem
            };
            return searchService;

            function getProducts(valueEntered){
                var query={}
                query.keyword=valueEntered;

                return api.getAllNames(query).$promise;
            }
            function getAllProducts(){
                return api.getAllProducts().$promise;
            }
            function storeItem(query){
                return api.storeItem(query).$promise;
            }
        }
    }
)();
