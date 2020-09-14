const Sequelize = require("sequelize");
const database = require("../database/database");

const Category = database.connection.define("categories", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

//Sync models com as tabelas do banco de dados
// Category.sync({ force: true }); //Rodar comando apenas 1x

module.exports = Category;
