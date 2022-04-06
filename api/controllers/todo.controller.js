const Todo = require("../models/Todo");
const checkPermissions = require("../utils/checkPermissions");

const createTodo = async (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) {
    res.status(401).json({ msg: "All fields are required" });
  }
  try {
    req.body.createdBy = req.user.userId;
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
    console.log("Success");
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTodo = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const todo = await Todo.findById({_id: req.params.id})
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todo = await Todo.find({createdBy: req.user.userId}).sort("-createdAt");
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    checkPermissions(req.user, todo.createdBy);

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedTodo)
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTodo = async (req, res) => {
  const { id: jobId } = req.params;
  try {
    const todo = await Todo.findOne({ _id: jobId });
    !todo && res.status(400).json({ msg: "Invalid Todo" });

    checkPermissions(req.user, todo.createdBy);

    await todo.remove();
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { createTodo, updateTodo, deleteTodo, getAllTodos, getTodo };
