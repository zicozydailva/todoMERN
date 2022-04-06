const { getTodo, getAllTodos, deleteTodo, updateTodo, createTodo } = require('../controllers/todo.controller');

const router = require('express').Router()

router.post("/", createTodo)
router.get("/", getAllTodos)
router.get("/:id", getTodo)
router.delete("/:id", deleteTodo)
router.patch("/:id", updateTodo)

module.exports = router;