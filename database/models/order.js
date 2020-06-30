const mongoose = require('mongoose');
const model_name = 'order';
const OrderSchema = new mongoose.Schema({
    _orderId: {
        type: String,
        required: true,
        unique: true
    },
    _userId: {
        type: String,
        required: true
    },
    _productSkus: { //comma separated product ids
        type: String,
        required: true
    },
    _purchaseDate: {
        type: String,
        required: true
    },
    _orderTotal: {
        type: String,
        required: true
    },
    _quantity: {
        type: String,
        required: true
    },
    _prices: {
        type: String,
        required: true
    },
    _promoCode: {
        type: String
    },
    _discount: {
        type: Number
    }
});
let OrderModel = mongoose.model(model_name, OrderSchema);