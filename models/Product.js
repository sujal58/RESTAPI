const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const Products = db.define(
  "Products",
  {
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_Price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

module.exports = Products;
