const express = require('express');
const { getTodos, addTodo, markDone } = require('../controllers/todo');
const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", addTodo);
router.put("/todos", markDone);

module.exports = router;