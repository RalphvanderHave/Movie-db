const Sequelize = require("sequelize");
const db = require("../config/database.js");
const User = require("./user.js");

const Collection = db.define("collections", {
  id: {
    type: Sequelize.INTEGER(10),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  collectionName: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

User.hasMany(Collection, {
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
Collection.belongsTo(User, {
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});

module.exports = Collection;
