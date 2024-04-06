const db = require("../config/db.js");
const Book = require("./Book.js");
const Student = require("./Student.js");

const studentBook = db.define(
  "studentBook",
  {},
  { tableName: "student_books", timestamps: true }
);

Book.belongsToMany(Student, { through: studentBook });
Student.belongsToMany(Book, { through: studentBook });

module.exports = studentBook;
