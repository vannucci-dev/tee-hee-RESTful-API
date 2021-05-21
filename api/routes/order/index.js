const express = require("express");
const db = require("../../config/queries/orders_queries");

const orders = express.Router();

orders.get("/", db.getAllOrders);
orders.get("/:id", db.getOrderById);
orders.post("/", db.addNewOrder);
orders.delete("/:id", db.deleteOrder);

module.exports = orders;
