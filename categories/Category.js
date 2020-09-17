const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define("categories", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
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
