var express = require('express');
var router = express.Router();
var path = require('path');
var productRoutes = require('./productRoutes');
//TODO: fix comment: "router" variable is initialized two times. Remove the above one.
router = function (app) {
    app.get('/', function (req, res, next) {
        console.log("coming here");
        res.render(path.join(__dirname, '../../client/BuyProduct/app/index'));

    });
    app.get('/getAllNames', productRoutes.searchProducts);
    app.get('/getAllProducts', productRoutes.getAllProducts);
    app.post('/storeItems', productRoutes.storeItems);
    app.get('/getBill', productRoutes.getBill);
    //TODO: fix comment: As this getBill is a getMethod, you can replace this url by this '/getBill/:billId'
};
module.exports = router;
