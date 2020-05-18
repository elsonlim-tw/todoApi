const express = require("express");
const cors = require("cors");
const app = express();
require("./utils/db.js");
const todoRouter = require("./router/todo.route");

app.use(cors());
app.use(express.json());

app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("welcome to demo v2");
});

app.get("/status", (req, res) => {
  res.send("up");
});

module.exports = app;
