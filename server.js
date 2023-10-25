const express = require("express");
const db = require("./db/db.json");
const path = require("path");
const fs = require("fs");

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => res.json(db));

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
