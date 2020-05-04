const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

const saveNotes = (notes) =>
  fs.writeFileSync('notes.json', JSON.stringify(notes));

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added'));
  } else {
    console.log(chalk.red.inverse('Note title taken'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse('No Note Found'));
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note Removed'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your notes'.toUpperCase()));
  notes.forEach((note, i) => console.log(`#${i + 1} - ${note.title}`));
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  console.log(note);
  if (note) console.log(`${chalk.inverse(note.title)}: ${note.body}`);
  else console.log(chalk.red.inverse('No note found'));
};

module.exports = { addNote, removeNote, listNotes, readNote };
