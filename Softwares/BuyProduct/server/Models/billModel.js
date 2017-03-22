/**
 * Created by shravya on 21/3/17.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var billSchema = new Schema({
        purchasedBy:{
            type:String,
            trim:true,
            required: true
        },
        purchasedOn:{
            type:Date,
        },
        list:[{
            type: Schema.Types.ObjectId,
            ref: 'items'
        }],
        total:{
            type:Number
        }
    },
    {collection:'bill'}
);

//TODO: fix comment: Model name can be Capital. i.e., instead of 'bill' it should be 'Bill'
var billModel = mongoose.model('bill', billSchema);
module.exports=billModel;