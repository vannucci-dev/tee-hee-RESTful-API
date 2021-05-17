const express = require("express");
const products = require("./products.js");

const api = express.Router();

api.get("/", (req, res) => {
  res.send("API homepage");
});

api.use("/products", products);

module.exports = api;
