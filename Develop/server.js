const { application } = require('express');
const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index.js');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');




const app = express();

const PORT = 3001

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)


// GET ROUTE for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/assets/index.html'))
);


// GET ROUTE for notes page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/assets/notes.html'))
);

// GET ROUTE for note input
app.get('/api/notes', (req, res) => {
    readFromFile('./db/de.json').then((data) => res.json(JSON.parse(data)));
});

// POST ROUTE for new note
app.post('/api/notes', (req, res) => {

    const { title, text} = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note Added');
    } else {
        res.errored('Error');
    }
});

// DELETE ROUTE for a note
// app.delete('/api/notes/:id', (req, res) => {
//     const noteId = req.params.id;
//     readFromFile('./db/db.json').then((data) => res.json)
// })






app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`)
);