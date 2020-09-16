const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugfy = require("slugify");

router.get("/admin/articles", (req, res) => {
  res.send("Articles page");
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll({ raw: true }).then((categories) => {
    res.render("admin/articles/new", {
      categories: categories,
    });
  });
});

router.post("/articles/save", (req, res) => {
  const { title, body, category } = req.body;
  Article.create({
    title: title,
    slug: slugfy(title),
    body: body,
    //CategoryID foi criado através do comando de relacionamento criado no arquivo Article.js
    categoryId: category,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

module.exports = router;
