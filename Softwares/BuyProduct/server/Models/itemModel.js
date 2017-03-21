/**
 * Created by shravya on 21/3/17.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var itemSchema = new Schema({
        product:{
            type:String,
            trim:true,
            required: true
        },
        quantity:{
            type:Number,
        },
        totalCost:{
            type:Number,
            required: true
        }
    },
    {collection:'items'}
);

var itemModel = mongoose.model('item', itemSchema);
module.exports=itemModel;