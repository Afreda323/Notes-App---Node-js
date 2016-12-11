// require fs
const fs = require('fs');
// require yargs
const yargs = require('yargs');
// require lodash
const _ = require('lodash');

// get user input
var command = process.argv[2];
const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}
//convert to yargs argv
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: {
      describe: 'Body of note',
      demand: true,
      alias: 'b'
    }
  })
  .command('list', 'list all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'remove a note', {
    title: titleOptions
  })
  .help()
  .argv;
//require notes.js
const notes = require('./notes.js');


//If elses to react to user input
if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note Added:');
        notes.logNote(note);
    } else {
        console.log("Title is taken")
    }
} else if (command === 'read') {
    var note = notes.readNote(argv.title);
    if (note) {
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    var rem = notes.removeNote(argv.title);
    var message = rem ? 'Note was removed' : 'Note not found';
    console.log(message);
} else if (command === 'list') {
    var all = notes.listNotes();
    console.log(`Printing ${all.length} note(s).`);
    all.forEach((note)=>notes.logNote(note));
} else {
    console.log('Command not recognized');
}
