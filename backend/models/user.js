const Sequelize = require("sequelize");
const db = require("../config/database.js");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER(10),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userName: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  userPassword: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  userEmail: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

User.associate = (models) => {
  User.hasMany(models.collection, {
    onDelete: "cascade",
  });
};

module.exports = User;
