/**
 * Created by shravya on 22/3/17.
 */
(function () {
    angular.module('home')
        .component('tableComponent', {

            bindings: {
                tableParams: '=',
                calculateTotal: '&',
                updateProduct: '&'

            },
            templateUrl: 'partials/table.html',
            controller: tableController,
            controllerAs: 'tc'
        });
    tableController.$inject = [];
    function tableController() {
        var vm = this;

    }
}());