const db = require("../db/queries");

async function getCategories(req, res) {
  const categories = await db.getCategories();
  const categoryArray = categories.map((category) => category.name);
  res.render("categories", { categories: categoryArray });
}

async function getNewCategory(req, res) {
  res.render("newCategory");
}

async function postNewCategory(req, res) {
  const { categoryName } = req.body;
  await db.insertCategory(categoryName);
  res.redirect("/");
}

async function getEditCategory(req, res) {
  const category = req.params["category"];
  res.render("editCategory", { category: category });
}

async function postEditCategory(req, res) {
  const oldCategory = req.params["category"];
  const { categoryName } = req.body;
  await db.editCategory(oldCategory, categoryName);
  res.redirect("/");
}

async function getItems(req, res) {
  const category = req.params["category"];
  const items = await db.getItems(category);
  res.render("items", { items: items, category: category });
}

async function getNewItem(req, res) {
  res.render("newItem", { category: req.params["category"] });
}

async function postNewItem(req, res) {
  const category = req.params["category"];
  await db.insertItem(
    category,
    req.body.itemName,
    req.body.itemDetails,
    req.body.itemPrice
  );
  res.redirect(`/${category}`);
}

async function getEditItem(req, res) {
  const category = req.params["category"];
  const items = await db.getItems(category);
  const item = items.find((item) => item.id === parseInt(req.params["id"]));
  res.render("editItem", { category: category, item: item });
}

async function postEditItem(req, res) {
  await db.updateItem(
    req.body.itemName,
    req.body.itemDetails,
    req.body.itemPrice,
    parseInt(req.params["id"])
  );
  res.redirect(`/${req.params["category"]}`);
}

async function getDeleteCategory(req, res) {
  await db.deleteCategory(req.params["category"]);
  res.redirect("/");
}

async function getDeleteItem(req, res) {
  await db.deleteItem(parseInt(req.params["id"]));
  res.redirect(`/${req.params["category"]}`);
}

module.exports = {
  getCategories,
  getNewCategory,
  postNewCategory,
  getEditCategory,
  postEditCategory,
  getItems,
  getNewItem,
  postNewItem,
  getEditItem,
  postEditItem,
  getDeleteCategory,
  getDeleteItem,
};
