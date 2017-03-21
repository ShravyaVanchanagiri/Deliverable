/**
 * Created by shravya on 21/3/17.
 */
var productModel = require('../Models/productModel');
var config = require("../config/config");
var prepareRes = require("../apiUtils/prepareRes");
var itemModel = require('../Models/itemModel');
var billModel = require('../Models/billModel');
var productRouter={
    searchProducts:function(req,res){
        var query = {};
        if(req.query.keyword){
            var regExp= new RegExp(req.query.keyword, "i");
            query.name=regExp;
        }else if(req.query.keyword===''){
            query.name='';
        }
        try {
            productModel.find(query, function (err, products) {
                if (err) {
                    console.log("error");
                    res.send({status:500})
                } else {
                    // object of rating gt 5
                    res.json({status:200, data:products})
                }
            });
        } catch(error) {
            console.log("Error...",error);
        }

    },
    getAllProducts:function(req,res){
        productModel.find({}, function (err, products) {
            console.log("Inside function");
            if (err) {
                console.log("error");
            } else {
                // object of all the users
                res.send({status:200, data:products});
            }
        })
    },
    storeItems:function(req,res){
        console.log(req.body);
        var queryParam=req.body;
        var totalItems = queryParam.products.length;
        var total = 0;
        var listItems = [];
        for(var i = 0;i<queryParam.products.length;i++){
            var eachProduct = queryParam.products[i];
            var itemObj = new itemModel({
                product:eachProduct._id,
                quantity:eachProduct.selectedQuantity,
                totalCost:eachProduct.price
            });
            itemObj.save(function(err,data){
                if(err){
                    console.log("error",err);
                }
                else{


                    for(var i=0;i<data;i++){
                        var total = total + data[i].price;
                        console.log(total);
                    }
                    console.log(total);
                    listItems.push(itemObj._id);
                    var total = 0;
                    for(var i=0;i<data.length;i++){
                        total = total + data[i].price;
                    }
                    console.log("in bill model........................................");
                }
            });
            console.log(i);
            console.log(listItems)
            if(i === totalItems-1)
            {
                console.log("billl savibgggg");

                new billModel({
                    purchasedBy:"Sridhar",
                    purchasedOn:new Date(),
                    list:listItems,
                    total:total
                }).save(function(err){
                    if(err){
                            console.log(err);
                    }
                    else{
                        /*res.send(prepareRes(200,billData,"OK"));*/
                        console.log("kkk");
                    }
                })
            }
        }



    }

};
module.exports=productRouter;



/*var newBill = new billModel();
 newBill.purchasedBy = query.purchasedBy;
 newBill.purchasedOn = query.purchasedOn;
 newBill.total = query.totalBill;
 newBill.items = [];
 for(var i =0; i<listItems.length; i++){
 var eachItem = listItems[i];
 promises.push(insertEachItem(eachItem, newBill));
 }
 Q.allSettled(promises).then(function(response){
 newBill.save(function(err){
 if(err){
 console.log(err);
 res.send(new errorResponse("error","no query formed properly",err));
 }
 else{
 var data = newBill._id;
 res.send(new successResponse("ok",data,{},"success full bill created for your items"));
 }
 })
 })*/



