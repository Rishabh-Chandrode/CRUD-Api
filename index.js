//express app
const express = require('express');
const app = express();

//database
const mongoose = require('mongoose');
const student = require('./models/user');

const connect = require('./db/db');
connect();

app.set('view engine', 'ejs');

app.get('/', async(req, res) => {
    const students = await student.find().sort();
    res.render('index', { students: students });

})

app.listen(5000, () => {
    console.log("server running on port 5000")
})