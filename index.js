const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const env = require("./.env");

//Configurando BodyParser para receber informações do formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const userController = require("./user/UserController");

// - - Banco de Dados START
//Banco de Dados
const connection = require("./database/database.js");
const Category = require("./categories/Category.js");
const Article = require("./articles/Article.js");
const User = require("./user/User.js");

//Conexão com o DB através do sequelize
connection
  .authenticate()
  .then(() => {
    console.log("Database connection made successfully.");
  })
  .catch((e) => {
    console.log(e);
  });
// - - Banco de Dados END

//Setando View Engine (Renderizador de HTML)
app.set("view engine", "ejs");

//Usando arquivos staticos como CSS/JS do Frontend
app.use(express.static("public"));

//Utilizando as rotas com prefixo
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", userController);

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", {
        articles: articles,
        categories: categories,
      });
    });
  });
});

app.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  return Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        return Category.findAll().then((categories) => {
          return res.render("article", {
            article: article,
            categories: categories,
          });
        });
      }
      return res.redirect("/");
    })
    .catch((err) => {
      return res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  const slug = req.params.slug;
  return Category.findOne({
    where: {
      slug: slug,
    }, //Join realizando a busca dos artigos pela categoria encontrada
    // Inclusão na busca dos artigos pertencentes a Categoria
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        return Category.findAll().then((categories) => {
          res.render("index", {
            articles: category.articles,
            categories: categories,
          });
        });
      }
      return res.redirect("/");
    })
    .catch((err) => res.redirect("/"));
});

app.listen(env.PORT, () => {
  return console.log("Server runing on port " + env.PORT);
});
