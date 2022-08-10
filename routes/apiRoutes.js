const router = require('express').Router();
const save = require('../db/saveNotes.js');


// GET /api/notes

router.get('/notes', (req, res) => {
    save
        .getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
    save
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

//DELETE /api/notes

module.exports = router;