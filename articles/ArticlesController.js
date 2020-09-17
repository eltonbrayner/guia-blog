const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugfy = require("slugify");

router.get("/admin/articles", (req, res) => {
  Article.findAll({
    include: [
      {
        model: Category,
      },
    ],
  }).then((article) => {
    return res.render("admin/articles/index", {
      article: article,
    });
  });
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

router.post("/articles/delete", (req, res) => {
  const id = req.body.id;
  //Diferente de undefined e não for um numero
  if (id != undefined && !isNaN(id)) {
    //Destroy deleta uma categoria
    return Article.destroy({
      where: {
        id: id,
      },
    }).then(() => {
      return res.redirect("/admin/articles");
    });
  }
  return res.redirect("/admin/articles");
});

router.get("/admin/articles/edit/:id", (req, res) => {
  //Pesquisa feita pelo Primary Key (ID)
  const id = req.params.id;
  if (isNaN(id)) res.redirect("/admin/articles/");
  Article.findByPk(id, {
    include: [
      {
        model: Category,
      },
    ],
  })
    .then((article) => {
      if (article != undefined) {
        return res.render("admin/articles/edit", {
          article: article,
        });
      }
      return res.redirect("/admin/articles/");
    })
    .catch((error) => {
      return res.redirect("/admin/articles/");
    });
});

router.post("/articles/update", (req, res) => {
  const { id, title, body } = req.body;
  Article.update(
    {
      title: title,
      body: body,
    },
    {
      where: {
        id: id,
      },
    }
  ).then(() => {
    res.redirect("/admin/articles");
  });
});

module.exports = router;
