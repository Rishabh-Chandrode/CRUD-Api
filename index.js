//express app
const express = require('express');
const app = express();

//database
const mongoose = require('mongoose');
const student = require('./models/user');

const connect = require('./db/db');
connect();

//custom routes
const api = require('./routes/api');
app.use('/api', api);

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));



app.use(express.urlencoded({ extended: true }))

//template engine
app.set('view engine', 'ejs');

//home
app.get('/', async(req, res) => {
    const students = await student.find().sort({ roll: 1 });
    res.render('index', { students: students });

})



app.listen(5000, () => {
    console.log("server running on port 5000")
})