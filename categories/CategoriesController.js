const express = require("express");
const router = express.Router();
const slugify = require("slugify"); //Biblioteca do NODE que transforma as palavras em slug
const Category = require("./Category");

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
  const title = req.body.title;
  if (title != undefined && title.length > 0) {
    return Category.create({
      title: title,
      slug: slugify(title),
    }).then(() => {
      res.redirect("/admin/categories");
    });
  }
  return res.redirect("/");
});

router.get("/admin/categories", (req, res) => {
  Category.findAll({ raw: true, order: [["id", "DESC"]] }).then(
    (arrayCategories) => {
      res.render("admin/categories/index.ejs", {
        categories: arrayCategories,
      });
    }
  );
});

router.post("/categories/delete", (req, res) => {
  const id = req.body.id;
  //Diferente de undefined e não for um numero
  if (id != undefined && !isNaN(id)) {
    //Destroy deleta uma categoria
    return Category.destroy({
      where: {
        id: id,
      },
    }).then(() => {
      return res.redirect("/admin/categories");
    });
  }
  return res.redirect("/admin/categories");
});

router.get("/admin/categories/edit/:id", (req, res) => {
  //Pesquisa feita pelo Primary Key (ID)
  const id = req.params.id;
  if (isNaN(id)) res.redirect("/admin/categories/");
  Category.findByPk(id)
    .then((categorie) => {
      if (categorie != undefined) {
        return res.render("admin/categories/edit", {
          categorie: categorie,
        });
      }
      return res.redirect("/admin/categories/");
    })
    .catch((error) => {
      return res.redirect("/admin/categories/");
    });
});

router.post("/categories/update", (req, res) => {
  const { id, title } = req.body;
  Category.update(
    {
      title: title,
      slug: slugify(title),
    },
    {
      where: {
        id: id,
      },
    }
  ).then(() => {
    res.redirect("/admin/categories");
  });
});

module.exports = router;
