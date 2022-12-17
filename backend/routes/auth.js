const express = require("express");
const User = require("../models/User");

const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "SushilisaGoodBoy";

// ROUTE 1: Create a User using: Post "/api/auth/createuser". No login required
router.post("/createuser", [
    body('name', 'Enter valide name').isLength({ min: 3 }),
    body('email', 'Enter valide email').isEmail(),
    body('password', 'password gretter than 4 characters').isLength({ min: 4 })
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        // jwt authentication
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken: authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});


// ROUTE 2: Authentication a User using: Post "/api/auth/login". No login required
router.post("/login", [
    body('email', 'Enter valide email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with corrent credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with corrent credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        // jwt authentication
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken: authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 3: Get loggedin User Details using: Post "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router