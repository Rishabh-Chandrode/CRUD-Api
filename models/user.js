const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    roll: {
        type: Number
    },
    email: {
        type: String
    }
})


module.exports = mongoose.model("Student", UserSchema);