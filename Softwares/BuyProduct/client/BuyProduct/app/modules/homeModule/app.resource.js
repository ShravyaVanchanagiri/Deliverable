/**
 * Created by shravya on 3/3/17.
 */
//TODO: fix comment: Files structure is not correct. Please refer the SBPO project structure
//Need to move all app.*.js files to modules/buyProduct/ folder
(function () {
    'use strict';

    angular.module('home')
        .factory('api', api);

    api.$inject = ['$resource', '$rootScope'];

    function api($resource, $rootScope) {
        return $resource('/', getParamDefaults(), getActions($rootScope));
    }

    var getParamDefaults = function () {
        return {
            id: '@id'
        };
    };

    var getActions = function () {
        return {
            'getAllNames': {
                method: 'GET',
                url: '/getAllNames'
            },
            'getAllProducts': {
                method: 'GET',
                url: '/getAllProducts'
            },
            'storeItem': {
                method: 'POST',
                url: '/storeItems'
            },
            'getBill': {
                url: '/getBill'
            }
            //TODO: fix comment: Why the last method doesn't have the method type
        }
    }
}());