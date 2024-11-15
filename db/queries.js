const pool = require("./pool");

async function insertCategory(category) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [category]);
}

async function editCategory(oldCategory, newCategory) {
  await pool.query("UPDATE categories SET name = $2 WHERE name = $1", [
    oldCategory,
    newCategory,
  ]);
}

async function deleteCategory(category) {
  await pool.query(
    "DELETE FROM items WHERE category_id = (SELECT id FROM categories WHERE name = $1)",
    [category]
  );
  await pool.query("DELETE FROM categories WHERE name = $1", [category]);
}

async function insertItem(category, name, details, price) {
  const { rows } = await pool.query(
    "SELECT id FROM categories WHERE name = $1",
    [category]
  );
  const categoryId = rows[0]?.id;
  await pool.query(
    "INSERT INTO items (category_id, name, details, price) VALUES ($1, $2, $3, $4)",
    [categoryId, name, details, price]
  );
}

async function updateItem(name, details, price, id) {
  await pool.query(
    "UPDATE items SET name = $1, details = $2, price = $3 WHERE id = $4",
    [name, details, price, id]
  );
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
}

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getItems(category) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = (SELECT id FROM categories WHERE name = $1)",
    [category]
  );
  return rows;
}

module.exports = {
  insertCategory,
  editCategory,
  deleteCategory,
  insertItem,
  updateItem,
  deleteItem,
  getCategories,
  getItems,
};
