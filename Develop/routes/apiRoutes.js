const apiRoutes = require('express').Router();
const fs = require("fs");
const notesData = require("../db/db.json");


const writeToDB = (notes) => {
  notes = JSON.stringify(notes);
  console.log(notes);
  fs.writeFileSync("./db/db.json", notes, (err) => {
    if (err) {
      return console.log(err);
    }
  });
};

apiRoutes.get("/api/notes", (req, res) => {
    readFromFile('./db/db.json').then((notesData) =>{
    res.json(JSON.parse(notesData));
})});

apiRoutes.post("/api/notes", (req, res) => {
  if (notesData.length == 0) {
    req.body.id = "0";
  } else {
    req.body.id = JSON.stringify(
      JSON.parse(notesData[notesData.length - 1].id) + 1
    );
  }

  console.log("req.body.id: " + req.body.id);

  notesData.push(req.body);

  writeToDB(notesData);
  console.log(notesData);
  res.json(req.body);
});

apiRoutes.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id.toString();
  console.log(id);

  for (i = 0; i < notesData.length; i++) {
    if (notesData[i].id === id) {
      console.log("Match!");
      res.send(notesData[i]);

      notesData.splice(i, 1);
      break;
    }
  }

  writeToDB(notesData);
});

module.exports = apiRoutes;
