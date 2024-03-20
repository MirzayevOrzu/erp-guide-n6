const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const dbPath = path.join(__dirname, "..", "..", "db", "todos.json");

function findAll() {
  const todos = fs.readFileSync(dbPath, "utf8");
  const parsed = JSON.parse(todos);
  return parsed;
}

function findAllOfUser(user_id) {
  const content = fs.readFileSync(dbPath, "utf8");
  const todos = JSON.parse(content);
  // authorization misol
  return todos.filter((todo) => todo.user_id === user_id);
}

function create(data) {
  const todos = findAll();
  const newTodo = { id: uuid.v4(), ...data };
  todos.push(newTodo);
  fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2));
  return newTodo;
}

function createBulk(data) {
  const todos = findAll();
  const newTodos = data.map((todo) => ({ id: uuid.v4(), ...todo }));
  todos.push(...newTodos);
  fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2));
  return true;
}

function findById(id) {
  const todos = findAll();
  let result = todos.find((todo) => todo.id === id);
  return (result = result ? result : null);
}

function update(id, newData) {
  const todos = findAll();
  const existing = todos.find((todo) => todo.id === id);
  const index = todos.indexOf(existing);
  todos.splice(index, 1, { ...existing, ...newData });
  fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2));
  return true;
}

function remove(id) {
  const todos = findAll();
  let result = todos.filter((todo) => todo.id !== id);
  const data = JSON.stringify(result, null, 2);
  fs.writeFileSync(dbPath, data, "utf8");
  return true;
}

function removeAllOfUser(user_id) {
  const todos = findAll();
  let result = todos.filter((todo) => todo.user_id !== user_id);
  const data = JSON.stringify(result, null, 2);
  fs.writeFileSync(dbPath, data, "utf8");
  return true;
}

function removeAllOfGuide(guide_id) {
  const todos = findAll();
  let result = todos.filter((todo) => todo.guide_id !== guide_id);
  const data = JSON.stringify(result, null, 2);
  fs.writeFileSync(dbPath, data, "utf8");
  return true;
}

module.exports = {
  findAll,
  findAllOfUser,
  update,
  create,
  createBulk,
  findById,
  remove,
  removeAllOfUser,
  removeAllOfGuide,
};
