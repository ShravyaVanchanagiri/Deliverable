/**
 * Created by shravya on 3/3/17.
 */
(function(){
    'use strict';

    angular.module('home')
        .factory('api', api);

    api.$inject = ['$resource','$rootScope'];

    //clinical trail API for data calls
    function api ($resource, $rootScope) {
        return $resource('/', getParamDefaults(), getActions($rootScope));
    }

    //default parameters will go here..
    var getParamDefaults = function() {
        return {
            id:'@id'
        };
    };

    //default actions and methods will go here..
    var getActions = function() {
        return {
            'getAllNames':{
                method : 'GET',
                url: '/getAllNames'
            },
            'getAllProducts' : {
                method : 'GET',
                url: '/getAllProducts'
            },
            'storeItem' : {
                method : 'POST',
                url: '/storeItems'
            },
            'getBill' : {
                url: '/getBill'
            }
        }
    }
}());