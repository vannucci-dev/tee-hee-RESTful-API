import express from "express";
import teesDB from "../tees-DB.js";

const tees = express.Router();

tees.get("/", (req, res) => {
  res.send("All the tees");
});

tees.get("/:id", (req, res) => {
  res.json(teesDB.find((tee) => tee.id === +req.params.id));
});

export default tees;
