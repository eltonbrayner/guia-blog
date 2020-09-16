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

// - - Banco de Dados START
//Banco de Dados
const connection = require("./database/database.js");
const Category = require("./categories/Category.js");
const Article = require("./articles/Article.js");

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

app.get("/", (req, res) => {
  res.redirect("/admin/categories");
});

app.listen(env.PORT, () => {
  return console.log("Server runing on port " + env.PORT);
});
