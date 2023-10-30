const app = require("express").Router();
const fs = require("fs");
let db = require("../db/db.json");

//Get the current databases info sent to the /notes endpoint.
app.get("/notes", (req, res) => {
  db = JSON.parse(fs.readFileSync("./db/db.json")) || [];
  res.json(db);
});

//Adds a new array with the data of a new note to the database.
app.post("/notes", (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: Math.floor(Math.random() * 1200),
  };
  db.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
});

//Cycles through the id of each array, pushing each into a new nested array, except the array with a specified id.
app.delete("/notes/:id", (req, res) => {
  let tempNotes = [];
  for (let i = 0; i < db.length; i++) {
    if (db[i].id != req.params.id) {
      tempNotes.push(db[i]);
    }
  }
  db = tempNotes;

  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
});

module.exports = app;
