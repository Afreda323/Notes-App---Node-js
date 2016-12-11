const fs = require('fs');

//fetch the notes
var fetchNotes = () => {
    try {
        //read the JSON file
        var noteString = fs.readFileSync('notes.json');
        //parse string
        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }
}

//save the notes
var saveNotes = (notes) => {
        fs.writeFileSync('notes.json', JSON.stringify(notes));
    }
//Add function
var addNote = (title, body) => {
        //notes array
        var notes = fetchNotes();
        //note object
        var note = {
            title,
            body
        };
        //handle duplicates
        var duped = notes.filter((note) => note.title === title)

        if (duped.length === 0) {
            //push note to array
            notes.push(note);
            //write stringified array to notes.json
            saveNotes(notes);
            return note;
        }
    }
//List function
var listNotes = () => {
      return fetchNotes();
    }
//Remove function
var removeNote = (title) => {
        //call notes
        var notes = fetchNotes();
        //filter notes
        var filtered = notes.filter((note) => note.title !== title);
        //save post filter
        saveNotes(filtered);
        console.log(`Deleting: ${title}`);

        return notes.length !== filtered.length;
    }
//Read function
var readNote = (title) => {
    console.log(`Reading: ${title}`);
    var notes = fetchNotes();
    var filt = notes.filter((note) => note.title === title);
    return filt[0];
}

//Log the note
var logNote = (note) => {
        console.log("------------------------");
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    }
    //export the functions
module.exports = {
    addNote,
    listNotes,
    removeNote,
    readNote,
    logNote
};
