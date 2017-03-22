/**
 * Created by shravya on 21/3/17.
 */
var productModel = require('../Models/productModel');
var prepareRes = require("../apiUtils/prepareRes");
var ItemModel = require('../Models/itemModel');
var BillModel = require('../Models/billModel');
//TODO: fix comment: All unnecesary console logs should be removed
//TODO: fix comment: Make use of SuccessResponse, ErrorResult js files to make a generic response throught the application
// I see the prepareRes() object but its not being use actively
var productRouter = {
    searchProducts: function (req, res) {
        var query = {};
        //TODO: fix comment: You can move the below condition based query to util method
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
            var itemObj = new ItemModel({
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
                        //TODO: fix comment: Below piece of code is duplicated so you can write it out of this if condition
                        listItems.push(itemObj._id);
                        console.log("should worked");
                        new BillModel({
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
        BillModel.findOne({_id: billId}, function (err, bill) {
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




