const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll: {
        type: Number,
        unique: true,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error("roll cant be negative");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})


module.exports = mongoose.model("Student", UserSchema);