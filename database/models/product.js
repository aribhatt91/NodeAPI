const mongoose = require('mongoose');
const model_name = 'product';
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    _productId: {
        type: String,
        required: true,
        unique: true
    },
    _productName: {
        type: String,
        required: true
    },
    _thumbnail: { //comma separated product ids
        type: String,
        required: true
    },
    _images: {
        type: String
    },
    _price: {
        type: Number,
        required: true
    },
    _allSizes: { //comma separated sizes
        type: String,
        required: true
    },
    _availableSizes: { //comma separated sizes
        type: String,
        required: true
    },
    _category: {
        type: String,
        required: true
    },
    _inventory: {
        type: Number,
        required: true
    },
    _discount: {
        type: Number
    },
    _rating: {
        type: Number
    },
    _description: {
        type: String
    }
});
mongoose.model(model_name, ProductSchema);