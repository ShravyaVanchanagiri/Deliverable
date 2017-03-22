/**
 * Created by vanchanagiri shravya on 1/25/2017.
 */
//TODO: fix comment: Use component instead of directives
(function () {
    angular.module('home')
        .directive('searchInclude', searchInclude);
    searchInclude.$inject = [];

    function searchInclude() {
        var directive = {
            templateUrl: 'partials/search.html'
        };
        return directive;
    }
})();

