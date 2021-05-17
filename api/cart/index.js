const express = require("express");
const db = require("./queries.js");

const carts = express.Router();

carts.get("/", db.getAllCarts);
carts.get("/:id", db.getCartById);
carts.post("/", db.addNewCart);
carts.put("/:id", db.updateCart);
carts.delete("/:id", db.deleteCart);

module.exports = carts;
