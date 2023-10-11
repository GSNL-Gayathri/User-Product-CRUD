const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product schema Definition
const productSchema = new Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  cost: {type:Number, required: true},
  inStock:{type:Boolean, required:false}
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
