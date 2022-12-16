const express = require("express");

const User = require("../models/User");

const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post("/", [
    body('name', 'Enter valide name').isLength({ min: 3 }),
    body('email', 'Enter valide email').isEmail(),
    body('password', 'password gretter than 4 characters').isLength({ min: 4 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
        .catch(err => {
            console.log(err)
            // send response error message for our understanding
            res.json({ error: 'Please enter a unique value', message:err.message })  

        })
})

module.exports = router