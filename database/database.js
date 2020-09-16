//Criando conexão com o Sequelize
const Sequelize = require("sequelize");
const env = require("../.env");

const connection = new Sequelize(env.dbname, env.dbuser, env.dbpass, {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = connection;
