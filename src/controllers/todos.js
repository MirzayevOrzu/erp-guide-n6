const express = require("express");
const { usersDb, guidesDb, todosDb } = require("../db");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function createTodoPage(req, res) {
  const users = usersDb.findAll();
  const guides = guidesDb.findAll();

  res.render("todos/create", { users, guides });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function createTodo(req, res) {
  const { user_id, guide_id } = req.body;

  const user = usersDb.findById(user_id);

  if (!user) {
    req.flash("error", "Foydalanuvchi topilmadi");

    return res.redirect("/todos/create");
  }

  const guide = guidesDb.findById(guide_id);

  if (!guide) {
    req.flash("error", "Tartib topilmadi");

    return res.redirect("/todos/create");
  }

  todosDb.create({ user_id, guide_id, completed: false });

  req.flash("success", "Bildirishnoma yaratildi");

  res.redirect("/todos/list");
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function listTodos(req, res) {
  const userId = req.user.id;

  const todos = todosDb.findAllOfUser(userId);
  const guides = guidesDb.findAll();

  const currentUser = usersDb.findById(userId);
  if (!currentUser) {
    req.flash("error", "Foydalanuvchi topilmadi");
    return res.redirect("/todos/list");
  }

  const guidesMap = new Map(guides.map((guide) => [guide.id, guide]));

  todos.forEach((todo) => {
    todo.user = currentUser;
    todo.guide = guidesMap.get(todo.guide_id);
  });

  res.render("todos/list", { todos });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function showTodo(req, res) {
  const { id } = req.params;

  const todo = todosDb.findById(id);

  if (!todo) {
    req.flash("warning", "Bildirishnoma topilmadi");

    return res.redirect("/todos/list");
  }

  if (todo.user_id !== req.user.id) {
    req.flash("error", "Bildirishnoma sizniki emas");

    return res.redirect("/todos/list");
  }

  todo.user = usersDb.findById(todo.user_id);
  todo.guide = guidesDb.findById(todo.guide_id);

  res.render("todos/show", { todo });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function completeTodo(req, res) {
  const { id } = req.params;

  const todo = todosDb.findById(id);

  if (!todo) {
    req.flash("error", "Bildirishnoma topilmadi");

    return res.redirect("/todos/list");
  }

  if (todo.user_id !== req.user.id) {
    req.flash("error", "Bildirishnoma sizniki emas");

    return res.redirect("/todos/list");
  }

  if (todo.completed) {
    req.flash("error", "Bildirishnoma bilan allaqachon tanishib chiqilgan");

    return res.redirect("/todos/list");
  }

  todosDb.update(id, { completed: true });

  res.redirect("/todos/list");
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function removeTodo(req, res) {
  const { id } = req.params;

  const todo = todosDb.findById(id);

  if (!todo) {
    req.flash("error", "Bildirishnoma topilmadi");

    return res.redirect("/todos/list");
  }

  todosDb.remove(id);

  res.redirect("/todos/list");
}

module.exports = {
  createTodoPage,
  createTodo,
  listTodos,
  showTodo,
  completeTodo,
  removeTodo,
};
