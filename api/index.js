import express from "express";
import tees from "./tees.js";

const api = express.Router();

api.get("/", (req, res) => {
  res.send("API homepage");
});

api.use("/tees", tees);

export default api;
