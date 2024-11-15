const express = require("express");
const path = require("node:path");
const controller = require("./controllers/controller");

const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", controller.getCategories);
app.get("/new-category", controller.getNewCategory);
app.post("/new-category", controller.postNewCategory);
app.get("/edit/:category", controller.getEditCategory);
app.post("/edit/:category", controller.postEditCategory);
app.get("/delete/:category", controller.getDeleteCategory);
app.get("/delete/:category/:id", controller.getDeleteItem);
app.get("/:category", controller.getItems);
app.get("/:category/new-item", controller.getNewItem);
app.post("/:category/new-item", controller.postNewItem);
app.get("/:category/edit/:id", controller.getEditItem);
app.post("/:category/edit/:id", controller.postEditItem);

app.listen(3000, () => {
  console.log("App running");
});
