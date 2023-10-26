// import modules required
const express = require("express");
const db = require("./db/db.json");
const path = require("path");
const fs = require("fs");

const PORT = 3000;

// set up app variable to a new express object
const app = express();

// create middleware static
// create middleware json
// create middleware urlencoded
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// write a get, post and delete end point routes for notes that are fetched in index.js

// GET hmtl route needs to send the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// GET notes route to send the notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET request for api/notes to return the db.json file
app.get("/api/notes", (req, res) => res.json(db));

// POST request to post into db.json file
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const id = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

  // create new object with new variables from req.body
  const { title, text } = req.body;

  // push the parsed body data into a new object
  const newNote = {
    title,
    text,
    id,
  };

  db.push(newNote);

  // writeFile the new array
  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
    err ? console.log(err) : console.log(`${req.method} method was a success!`);
  });

  res.json(db);

  const response = {
    status: "success",
    body: newNote,
  };
  console.log(response);
});

// Delete request to delete specific note by id /api/notes/id
app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  for (let i = 0; i < db.length; i++) {
    const currentNote = db[i];
    if (currentNote.id === noteId) {
      db.splice(i, 1);
      fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        err
          ? console.log(err)
          : console.log(`${req.method} method was a success!`);
      });

      res.json(db);
    }
  }
});

// app listen
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
