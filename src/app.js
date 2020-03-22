const express = require("express");
const cors = require("cors");
const app = express();
require("./utils/db.js");
const todoRouter = require("./router/todo.route");

app.use(
  cors({
    origin: "localhost:3000",
    methods: ["GET"],
    allowedHeaders: ["Content-Type"]
  })
);
app.use(express.json());

app.use("/todo", todoRouter);

app.get("/status", (req, res) => {
  res.send("up");
});

module.exports = app;
