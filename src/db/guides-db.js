const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const dbPath = path.join(__dirname, "..", "..", "db", "guides.json");

function findAll() {
  const guides = fs.readFileSync(dbPath, "utf8");
  const parsed = JSON.parse(guides);
  return parsed;
}

function create(data) {
  const guides = findAll();
  const newGuide = { id: uuid.v4(), ...data };
  guides.push(newGuide);
  fs.writeFileSync(dbPath, JSON.stringify(guides, null, 2));
  return newGuide;
}

function findById(id) {
  const guides = findAll();
  let result = guides.find((guide) => guide.id === id);
  return (result = result ? result : null);
}

function update(id, newData) {
  const guides = findAll();
  const existing = guides.find((guide) => guide.id === id);
  const index = guides.indexOf(existing);
  guides.splice(index, 1, { ...existing, ...newData });
  fs.writeFileSync(dbPath, JSON.stringify(guides, null, 2));
  return true;
}

function remove(id) {
  const guides = findAll();
  let result = guides.filter((guide) => guide.id !== id);
  const data = JSON.stringify(result, null, 2);
  fs.writeFileSync(dbPath, data, "utf8");
  return true;
}

module.exports = {
  findAll,
  update,
  create,
  remove,
  findById,
};
