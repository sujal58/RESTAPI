const db = require("../config/db.js");
const { DataTypes } = require("sequelize");

const File = db.define(
  "File",
  {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "fileupload",
    timestamps: true,
  }
);

module.exports = File;
