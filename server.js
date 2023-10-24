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