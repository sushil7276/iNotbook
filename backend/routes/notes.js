const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get loggedin User Details using: GET "/api/auth/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: post "/api/auth/addnote". Login required
router.get("/addnote", fetchuser, [
    body('title', 'Enter valide name').isLength({ min: 3 }),
    body('description', 'description gretter than 4 characters').isLength({ min: 4 })
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        //if there are errors return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Save Note Field
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save()

        res.json(saveNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router