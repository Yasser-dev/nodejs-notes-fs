const fs = require("fs");
const chalk = require("chalk");

const getNotes = function () {
  return "Your notes...";
};

// Load notes from json file
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

// Save notes to json file
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// add a note to the json file
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green("note added!"));
  } else {
    console.log(chalk.red("note title already exists"));
  }
};

// remove a note from the json file
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notesToKeep.length < notes.length) {
    console.log(chalk.green("note deleted"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red("note was not found"));
  }
};

// load and print all notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse("Notes:"));
  notes.forEach((note, i) => {
    console.log(chalk.blue(`${i + 1}- ${note.title}`));
  });
};

// load and print a specific note
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red("No note with the title: " + title));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
