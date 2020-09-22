const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  admin: {
    type: Sequelize.STRING,
  },
});

//Sync models com as tabelas do banco de dados
User.sync();

module.exports = User;
