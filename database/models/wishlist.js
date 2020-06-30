const mongoose = require('mongoose');
const model_name = 'wishlist';
const Schema = mongoose.Schema;
const WishListSchema = new Schema({
    _wishListId: {
        type: String,
        required: true,
        unique: true
    },
    _wishListName: {
        type: String,
        required: true
    },
    _type: {
        type: String,
        required: true
    },
    _createdAt: {
        type: String,
        required: true
    },
    _productIds: { //comma separated product ids
        type: String,
    }
});
mongoose.model(model_name, WishListSchema);