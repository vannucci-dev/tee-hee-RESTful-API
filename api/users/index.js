const express = require("express");
const db = require("./queries.js");

const users = express.Router();

users.get("/", db.getAllUsers);
users.get("/:id", db.getUserById);
users.post("/", db.addNewUser);
users.put("/:id", db.updateUser);
users.delete("/:id", db.deleteUser);

module.exports = users;
