const express = require("express");
const db = require("./queries.js");

const products = express.Router();

products.get("/", db.getAllProducts);
products.get("/:id", db.getProductById);
products.post("/", db.addNewProduct);
products.put("/:id", db.updateProduct);
products.delete("/:id", db.deleteProduct);

module.exports = products;
