const Sequelize = require("sequelize");
const db = require("../config/database.js");

const Movie = db.define("movies", {
  id: {
    type: Sequelize.INTEGER(10),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  tmdbID: {
    type: Sequelize.INTEGER(10),
    allowNull: false,
  },
  movieImg: {
    type: Sequelize.STRING(255),
  },
  movieTitle: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  format: {
    type: Sequelize.STRING(255),
    defaultValue: "DVD",
  },
  extras: {
    type: Sequelize.STRING,
  },
  version: {
    type: Sequelize.STRING(255),
  },
  prodComp: {
    type: Sequelize.STRING(255),
  },
});

module.exports = Movie;
