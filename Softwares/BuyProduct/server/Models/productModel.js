/**
 * Created by shravya on 21/3/17.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var productSchema = new Schema({
        name:{
            type:String,
            trim:true,
            required: true
        },
        category:{
            type:String,
            trim:true,
            required:true
        },
        price:{
            type:Number,
            required: true
        }
    },
    {collection:'products'}
);

var productModel = mongoose.model('product', productSchema);
module.exports=productModel;