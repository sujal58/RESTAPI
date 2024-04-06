const db = require("../config/db.js");
const { DataTypes } = require("sequelize");
const Author = require("./Author.js");
const Student = require("./Student.js");

const Book = db.define(
  "Book",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "books",
    timestamps: true,
  }
);

module.exports = Book;
