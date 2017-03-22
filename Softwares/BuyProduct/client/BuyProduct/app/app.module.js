/**
 * Created by shravya on 21/3/17.
 */
//TODO: fix comment: All submodules should contain the main module as a prefix
//For eg: Instead of "home" it should be "buyProduct.home"
(function () {
    angular.module('buyProduct', [
        "ngTable",
        "home",
        "ui.router",
        "ngResource",
        "ui.select",
        "ngSanitize"
    ])
})();