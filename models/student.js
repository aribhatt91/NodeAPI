const mongoose = require('mongoose');
const model_name = 'student';
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    _regNo: {
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
    _regYear: {
        type: Number
    },
    _semester: {
        type: Number
    },
    _department: {
        type: String
    },
    _specialization: {
        type: String
    }
});
mongoose.model(model_name, StudentSchema);
