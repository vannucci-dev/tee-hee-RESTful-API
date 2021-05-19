const express = require("express");
const api = require("./api/index.js");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api", api);

app.set("view engine", "ejs");

const port = 3000;

app.listen(port, () => {
  console.log("Server started");
});
