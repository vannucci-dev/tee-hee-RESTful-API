const express = require("express");
const api = require("./api/index.js");

const app = express();

app.use(express.json());

app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Homepage");
});

const port = 3000;

app.listen(port, () => {
  console.log("Server started");
});
