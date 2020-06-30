const mongoose = require('mongoose');
const model_name = 'review';
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    _reviewId: {
        type: String,
        required: true,
        unique: true
    },
    _userId: {
        type: String,
        required: true
    },
    _date: {
        type: String,
        required: true
    },
    _rating: {
        type: Number,
        required: true
    },
    _text: {
        type: String
    }
});
mongoose.model(model_name, ReviewSchema);