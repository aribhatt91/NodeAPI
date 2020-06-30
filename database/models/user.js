const mongoose = require('mongoose');
const model_name = 'user';
const UserSchema = new mongoose.Schema({
    _userId: {
        type: String,
        required: true,
        unique: true
    },
    _firstName: {
        type: String
    },
    _lastName: {
        type: String
    },
    _email: {
        type: String
    },
    _contact: {
        type: String
    },
    _country: {
        type: String
    },
    _pincode: {
        type: String
    },
    _house_number: {
        type: String
    },
    _street_address: {
        type: String
    }
});
let UserModel = mongoose.model(model_name, UserSchema);
module.exports = UserModel;