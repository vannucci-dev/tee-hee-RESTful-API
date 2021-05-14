const express = require("express");
const tees = require("./tees.js");

const api = express.Router();

api.get("/", (req, res) => {
  res.send("API homepage");
});

api.use("/tees", tees);

module.exports = api;
