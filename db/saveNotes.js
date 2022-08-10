const fs = require('fs');
const util = require('util');
//Satisfie NPM Package Requirement
var uniqid = require('uniqid');

const getNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Save {
    read() {
        return getNote('db/db.json', 'utf8');
    }

    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }


//Add Notes
addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Please fill in the title and text!");
        }

        const newNote = { title, text, id: uniqid() };
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }
}




module.exports = new Save();