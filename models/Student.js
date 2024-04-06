const Book = require("./Book.js");
const db = require("../config/db.js");
const DataTypes = require("sequelize");

const Student = db.define(
  "Student",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    mobileNumber: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "others"),
    },
  },
  {
    tableName: "student_data",
    timestamps: true,
  }
);

//define one to one relationship between book and students
// Student.hasMany(Book, { foreignKey: "studentId" });

module.exports = Student;
