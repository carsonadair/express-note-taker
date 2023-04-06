const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helper/utilities");

// This GETs the notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// This is to POST a new note
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");

    res.json("Note created");
  } else {
    res.error("Cannot make note");
  }
});

// This deletes the notes
notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((notes) => {
      console.log(res.json);
      let previousNotes = notes.filter((note) => note.id !== noteId);
      writeToFile("./db/db.json", previousNotes);
      res.json("Note deleted");
    });
});

module.exports = notes;
