const express = require("express");
const isLoggedIn = require("../shared/middlewares/is-logged-in");
const {
  createTodoPage,
  createTodo,
  listTodos,
  showTodo,
  completeTodo,
  removeTodo,
} = require("../controllers/todos");
const hasRole = require("../shared/middlewares/has-role");
const validate = require("../shared/middlewares/validate");
const { createTodoSchema } = require("../schemas/todos");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.page = "todos";
  next();
});

router.get("/todos/create", isLoggedIn, hasRole(["admin"]), createTodoPage);
router.post(
  "/todos/create",
  isLoggedIn,
  hasRole(["admin"]),
  validate(createTodoSchema),
  createTodo
);
router.get("/todos/list", isLoggedIn, listTodos);
router.get("/todos/:id", isLoggedIn, showTodo);
router.post("/todos/:id/complete", isLoggedIn, completeTodo);
router.post("/todos/:id/delete", isLoggedIn, hasRole(["admin"]), removeTodo);

module.exports = router;
