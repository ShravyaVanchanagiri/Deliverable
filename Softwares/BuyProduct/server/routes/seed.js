/**
 * Created by shravya on 21/3/17.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var productModel= require('../Models/productModel');
//TODO: fix comment: Un-necessary initialization of the MongoClient
var MongoClient = require('mongodb').MongoClient;
// Connect to the db
mongoose.connect('mongodb://127.0.0.1:27017/buyProducts',function(error){
    if(!error){
        console.log("connection established...!");
    }
});

//var comments= require("../models/commentModel");
//TODO: last priority to fix
fs.readFile('/home/shravya/WebstormProjects/Deliverable/Softwares/BuyProduct/server/routes/products.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    if(data) {
        console.log('===data :', data);
        var prods = JSON.parse(data);
        console.log(prods.length);
        for(var i in prods){
            var prod = new productModel({
                name:prods[i].name,
                category:prods[i].category,
                price:prods[i].price
            })
            prod.save(function (err) {
                if (err){
                    console.log("error");
                }
            })
        }
        //TODO: fix comment: You can remove the un-used code
    }
});