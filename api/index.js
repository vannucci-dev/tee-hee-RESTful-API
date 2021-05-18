const express = require("express");
const products = require("./routes/products");
const users = require("./routes/users");
const carts = require("./routes/cart");

const api = express.Router();

api.get("/", (req, res) => {
  res.send("API homepage");
});

api.use("/products", products);
api.use("/users", users);
api.use("/cart", carts);

module.exports = api;
