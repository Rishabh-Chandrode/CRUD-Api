const express = require('express');
const router = express.Router();
const validator = require('validator');


const mongoose = require('mongoose');
const Student = require("../models/user");

const methodOverride = require('method-override');

router.use(express.urlencoded({ extended: true }));




//----------------------------------------------------------------------------------
//create route

router.get('/create', (req, res) => {
    res.render('form');
})

router.post('/create', async(req, res) => {
    var student = new Student();
    student.name = req.body.name;
    student.email = req.body.email;
    student.roll = req.body.roll;
    try {
        await student.save();
        res.redirect('/');

    } catch (e) {
        console.log(e);
    }
});

//--------------------------------------------------------------------------------------
//update Route

router.get('/update/:id', async(req, res) => {
    const student = await Student.findById(req.params.id);
    res.render('editform', { student: student });
})

router.post('/update/:id', async(req, res) => {
    let student = await Student.findById(req.params.id);
    student.name = req.body.name;
    student.email = req.body.email;
    student.roll = req.body.roll;
    try {
        await student.save();
        res.redirect('/');
    } catch (e) {
        console.log(e);
    }
})

//---------------------------------------------------------------------------------------

//delete Route

router.use(methodOverride('_method'));

router.delete('/delete/:_id', async(req, res) => {
    try {
        await Student.findByIdAndDelete(req.params._id);
        res.redirect('/');
    } catch (e) {
        console.log(e);
    }
})

//-----------------------------------------------------------------------------------

module.exports = router;