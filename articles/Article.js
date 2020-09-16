const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

//Sync models com as tabelas do banco de dados
Article.sync({ force: true }); //Rodar comando apenas 1x

// Tem muitos -> Uma categoria tem muitos artigos
Category.hasMany(Article);

//Pertence a -> Um artigo pertence a uma categoria
// Category.belongsTo(Article);
Article.belongsTo(Category);

module.exports = Article;
