const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const dbPath = path.join(__dirname, "..", "..", "db", "users.json");

function findAll() {
  const content = fs.readFileSync(dbPath, "utf8");
  const users = JSON.parse(content);
  return users;
}

function create(data) {
  const users = findAll();
  const newUser = { id: uuid.v4(), ...data };
  users.push(newUser);
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  return newUser;
}

function findById(id) {
  const users = findAll();
  const user = users.find((user) => user.id === id);
  return user ? user : null;
}

function findByUsername(username) {
  const users = findAll();
  const user = users.find((user) => user.username === username);
  return user ? user : null;
}

function update(id, newData) {
  const users = findAll();
  const existing = users.find((user) => user.id === id);
  const index = users.indexOf(existing);
  users.splice(index, 1, { ...existing, ...newData });
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  return true;
}

function remove(id) {
  let users = findAll();
  users = users.filter((user) => user.id !== id);
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  return true;
}

module.exports = {
  create,
  findAll,
  findById,
  findByUsername,
  update,
  remove,
};
