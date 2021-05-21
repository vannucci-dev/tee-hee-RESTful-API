const express = require("express");
const db = require("../../config/queries/carts_queries");

const carts = express.Router();

carts.get("/", db.getAllCarts);
carts.get("/:id", db.getCartById);
carts.post("/", db.addNewCart);
carts.delete("/:id", db.deleteCart);

module.exports = carts;
