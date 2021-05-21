const express = require("express");
const products = require("./routes/products");
const users = require("./routes/users");
const carts = require("./routes/cart");
const auth = require("./routes/auth");
const orders = require("./routes/order");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

const swaggerDocument = yaml.load(
  fs.readFileSync(path.resolve(__dirname, "../swagger.yml"), "utf8")
);

const api = express.Router();

api.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

api.use("/users", users);
api.use("/carts", carts);
api.use("/products", products);
api.use("/auth", auth);
api.use("/orders", orders);

module.exports = api;
