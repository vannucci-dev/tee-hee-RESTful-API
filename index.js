const express = require("express");
const app = express();
const api = require("./api/index.js");
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", api);

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log("Server started on port " + port);
});
