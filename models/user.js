const mongoose = require('mongoose');
const validator = require('validator');
const alert = require('alert');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
})


module.exports = mongoose.model("Student", UserSchema);