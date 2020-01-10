const mongoose = require("mongoose"),
      extend = require('mongoose-schema-extend');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    Image:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Category:{
        type: String,
        required: true
    },
    Gender:String,
    Cost:{
        type: Number,
        required: true
    },
    Sale:Number,
    Amount:{
        type: Number,
        required: true
    },
    Describe: String,
    Product_Group: String
}, {collection: 'Product', discriminatorKey: '_type'});

const shirtSchema = productSchema.extend({
    // Category: "Shirt"
});

const tshirtSchema = productSchema.extend({
    // Category: "Tshirt"
});

const Product = mongoose.model("Product", productSchema),
      Shirt = mongoose.model("Shirt", shirtSchema),
      Tshirt = mongoose.model("Tshirt", tshirtSchema)

const createProduct = function(inforProduct){
    if(inforProduct.Category === "shirt"){
        const s = new Shirt(inforProduct)
        return s.save(function(err){
            if(!err){
                return console.log("product is created");
            }
            else{
                return console.log(err);
            }
        });
    }
    if(inforProduct.Category === "tshirt"){
        const ts = new Tshirt(inforProduct)
        return ts.save(function(err){
            if(!err){
                return console.log("product is created");
            }
            else{
                return console.log(err);
            }
        })
    }
}

module.exports = {
    Product,
    Shirt,
    Tshirt,
    createProduct
}
