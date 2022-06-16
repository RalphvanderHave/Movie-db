const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Collection = require("./collection.js");
const Movie = require("./movie.js");

const CollectionsMovies = db.define("collectionsMovies", {
  id: {
    type: Sequelize.INTEGER(10),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

Collection.belongsToMany(Movie, { through: CollectionsMovies });
Movie.belongsToMany(Collection, { through: CollectionsMovies });

module.exports = CollectionsMovies;
