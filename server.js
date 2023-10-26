const express = require("express");
const db = require("./db/db.json");
const path = require("path");
const fs = require("fs");

const PORT = 3000;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => res.json(db));

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  const newNote = {
    title,
    text,
  };
  const noteArray = db;
  noteArray.push(newNote);

  const stringNoteArray = JSON.stringify(noteArray);

  fs.writeFile("./db/db.json", stringNoteArray, (err) => {
    err ? console.log(err) : console.log(`${req.method} method was a success!`);
  });

  res.json(db);

  const response = {
    status: "success",
    body: newNote,
  };
  console.log(response);
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

// import modules required
// set up app variable to a new express object
// create middleware urlencoded
// create middleware json
// create middleware static
// write a get, post and delete end point routes for notes that are fetched in index.js
// GET hmtl route needs to send the index.html file
// GET notes route to send the notes.html
// GET request for api/notes to return the db.json file
// POST request to post into db.json file
// push the parsed body data into the array
// object destructing the req.body
// create new object with new variables from req.body
// writeFile the new array
// Delete request to delete specific note by id /api/notes/id
// get requests
// app listen
