const express = require("express");
const db = require("./queries.js");

const tees = express.Router();

tees.get("/", db.getAllTees);
tees.get("/:id", db.getSingleTeeById);
tees.post("/", db.createNewTee);
tees.put("/:id", db.updateTee);
tees.delete("/:id", db.deleteTee);

module.exports = tees;
