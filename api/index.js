const express = require("express");
const products = require("./products");
const users = require("./users");
const carts = require("./cart");

const api = express.Router();

api.get("/", (req, res) => {
  res.send("API homepage");
});

api.use("/products", products);
api.use("/users", users);
api.use("/cart", carts);

module.exports = api;
