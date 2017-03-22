/**
 * Created by shravya on 21/3/17.
 */
var productModel = require('../Models/productModel');
var config = require("../config/config");
var prepareRes = require("../apiUtils/prepareRes");
var itemModel = require('../Models/itemModel');
var billModel = require('../Models/billModel');
var productRouter = {
    searchProducts: function (req, res) {
        var query = {};
        if (req.query.keyword) {
            var regExp = new RegExp(req.query.keyword, "i");
            query.name = regExp;
        } else if (req.query.keyword === '') {
            query.name = '';
        }
        try {
            productModel.find(query, function (err, products) {
                if (err) {
                    console.log("error");
                    res.send({status: 500})
                } else {
                    // object of rating gt 5
                    res.json({status: 200, data: products})
                }
            });
        } catch (error) {
            console.log("Error...", error);
        }

    },
    getAllProducts: function (req, res) {
        productModel.find({}, function (err, products) {
            console.log("Inside function");
            if (err) {
                console.log("error");
            } else {
                // object of all the users
                res.send({status: 200, data: products});
            }
        })
    },
    storeItems: function (req, res) {
        console.log(req.body);
        var queryParam = req.body;
        var listItems = [];
        queryParam.products.forEach(function (eachProduct, index) {
            var itemObj = new itemModel({
                product: eachProduct._id,
                quantity: eachProduct.selectedQuantity,
                totalCost: eachProduct.price
            });
            itemObj.save(function (err, data) {
                if (err) {
                    console.log("error", err);
                }
                else {
                    var total = 0;
                    for(var i=0;i<queryParam.products.length;i++){
                        total += queryParam.products[i].price;
                    }
                    console.log(total);
                    if (index === queryParam.products.length - 1) {
                        listItems.push(itemObj._id);
                        console.log("should worked");
                        new billModel({
                            purchasedBy: "Sridhar",
                            purchasedOn: new Date(),
                            list: listItems,
                            total: total
                        }).save(function (err, billData) {
                            if (err) {
                                console.log("Eror", err);
                            }
                            else {
                                console.log("bill data:", billData);
                                res.send(prepareRes(200, billData._id, "OK"));
                            }
                        })
                    }
                    else {
                        listItems.push(itemObj._id);
                    }

                }
            })
            console.log("index", index)
            console.log("queryParam.products", queryParam.products.length)
        })
    },
    getBill: function (req, res) {
        console.log(req.query);
        var billId = req.query.billId;
        billModel.findOne({_id: billId}, function (err, bill) {
            console.log("Inside function");
            if (err) {
                console.log("error");
            } else {
                res.send({status: 200, data: bill});
            }
        })
    }

};
module.exports = productRouter;




