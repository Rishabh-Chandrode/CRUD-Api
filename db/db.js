const mongoose = require('mongoose');
require('dotenv').config()

const db = process.env.mongouri;

const connect = async() => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("database connected");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect;