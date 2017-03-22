/**
 * Created by vanchanagiri shravya on 1/25/2017.
 */
(function () {
    angular.module('buyProduct.home')
        .component('searchInclude',{
            bindings: {},
            templateUrl: 'partials/search.html',
            controller: searchInclude,
            controllerAs: 'si'
        });
    searchInclude.$inject = [];

    function searchInclude() {
        var vm=this;
    }
})();

