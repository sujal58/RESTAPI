const { DataTypes } = require("sequelize");
const db = require("../config/db.js");
const Products = require("./Product.js");

const Customer = db.define(
  "Customer",
  {
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "customers",
    timestamps: true,
  }
);

Customer.hasOne(Products, { foreignKey: "customerId" });
Products.belongsTo(Customer, { foreignKey: "customerId" });

module.exports = Customer;
