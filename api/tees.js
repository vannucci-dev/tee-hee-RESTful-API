const express = require("express");
const db = require("./queries.js");

const tees = express.Router();

tees.get("/", db.getAllTees);

/*
tees.get("/:id", (req, res) => {
  if (teesDB[`tee${req.params.id}`] != null) {
    res.status(200).send(teesDB[`tee${req.params.id}`]);
  } else {
    res.status(404).send();
  }
});

tees.post("/", (req, res) => {
  const newTee = req.body;

  teesDB[`tee${newTee.id}`] = newTee;
  res.status(201).send(teesDB);
});

tees.put("/:id", (req, res) => {
  var id = parseInt(req.params.id);
  const updatedTee = req.body;

  if (teesDB[`tee${id}`] != null) {
    teesDB[`tee${id}`] = updatedTee;
    res.status(200).send(teesDB[`tee${id}`]);
  } else {
    res.status(400).send();
  }
});
*/

module.exports = tees;
