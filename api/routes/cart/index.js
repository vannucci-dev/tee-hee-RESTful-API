const express = require("express");
const db = require("../../config/queries/carts_queries");
const { requiresAuth } = require("express-openid-connect");

const carts = express.Router();

carts.get("/", db.getAllCarts);
carts.get("/:id", requiresAuth(), db.getCartById);
carts.post("/", requiresAuth(), db.addNewCart);
carts.put("/:id", requiresAuth(), db.updateCart);
carts.delete("/:id", requiresAuth(), db.deleteCart);

module.exports = carts;
