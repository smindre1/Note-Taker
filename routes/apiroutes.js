// CRUD - Create (post)

const app = require("express").Router();
const fs = require("fs");
let db = require("../db/db.json");

app.get("/notes", (req, res) => {
  db = JSON.parse(fs.readFileSync("./db/db.json")) || [];
  res.json(db);
});

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
