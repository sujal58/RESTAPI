const db = require("../config/db.js");
const { DataTypes } = require("sequelize");

const Author = db.define(
  "Author",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "authors",
    timestamps: true,
  }
);

module.exports = Author;
