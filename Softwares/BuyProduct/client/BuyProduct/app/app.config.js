/**
 * Created by shravya on 21/3/17.
 */
(function() {
    angular.module("buyProduct")
        .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
            console.log("from config");

            //$locationProvider.html5Mode(true);

            $stateProvider.state('search',{
                url:'/home',
                templateUrl: 'partials/search.html',
                controller: 'SearchController',
                controllerAs: 'sc'
            }).state('bill',{
                url:'/bill',
                templateUrl: 'partials/bill.html',
                controller: 'SearchController',
                controllerAs: 'sc'
            });

            $urlRouterProvider.otherwise('/home');

        })
})();