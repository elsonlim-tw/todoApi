const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.model");

router.post("/", async (req, res) => {
  const { title, isDone } = req.body;
  const newTodo = new Todo({ title, isDone });

  await newTodo.save();
  res.json(newTodo);
});

router.get("/", async (req, res) => {
  const todoItems = await Todo.find();

  res.json(todoItems);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Todo.findByIdAndDelete(id);

  res.sendStatus(200);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const fieldsToUpdate = {};

  Object.entries(req.body).forEach(item => {
    const [key, value] = item;

    if (["title", "isDone"].includes(key)) {
      fieldsToUpdate[key] = value;
    }
  });

  await Todo.findByIdAndUpdate(id, fieldsToUpdate);

  res.sendStatus(200);
});

module.exports = router;
