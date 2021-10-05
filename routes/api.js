const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const mongoose = require('mongoose');
const Student = require("../models/user");

const methodOverride = require('method-override');
const { response } = require('express');

// router.use(express.urlencoded({ extended: true }));

const urlencodedParser = bodyParser.urlencoded({ extended: false });


//----------------------------------------------------------------------------------
//create route

router.get('/create', (req, res) => {
    const alert = [];
    res.render('form', { alert });
})

router.post('/create', urlencodedParser, [
    check('email', 'email invalid').isEmail(),
    check('roll', 'Invalid roll').isNumeric()
], async(req, res) => {
    const err = validationResult(req);
    if (err.isEmpty()) {
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
    } else {
        const alert = err.array();
        res.render('form', { alert });
    }


});

//--------------------------------------------------------------------------------------
//update Route

router.get('/update/:id', async(req, res) => {
    const student = await Student.findById(req.params.id);
    const alert = [];
    res.render('editform', { student: student, alert });
})

router.post('/update/:id', urlencodedParser, [
    check('email', 'email invalid').isEmail(),
    check('roll', 'Invalid roll').isNumeric()
], async(req, res) => {
    const err = validationResult(req);
    let student = await Student.findById(req.params.id);
    if (err.isEmpty()) {
        student.name = req.body.name;
        student.email = req.body.email;
        student.roll = req.body.roll;
        try {
            await student.save();
            res.redirect('/');
        } catch (e) {
            console.log(e);
        }
    } else {
        const alert = err.array();
        res.render('editform', { student: student, alert });
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