//@desc create Book
//@route post /api/Books
//@access public

const Book = require("../models/Book.js");
const Student = require("../models/Student.js");

const createBook = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    //check if student exists
    // const student = await Student.findByPk(studentId);
    // if (!student) {
    //   return res.status(404).json({ message: "Student not found" });
    // }

    //create a new book and associates it with the students
    const newBook = await Book.create({
      name,
      price,
      description,
    });

    if (newBook) {
      return res.status(201).json({ message: "Book registered Succesfully!!" });
    } else {
      return res.status(500).json({ message: "Internal Server Error!!" });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

const getAllBook = async (req, res) => {
  try {
    const allBookDetails = await Book.findAll({
      include: {
        model: Student,
        attributes: {
          exclude: [
            "password",
            "studentBook",
            "createdAt",
            "updatedAt",
            "studentBook",
          ],
        },
      },
    });

    if (allBookDetails.length > 0) {
      return res
        .status(200)
        .json({ message: "Book fetched successfully!!", data: allBookDetails });
    } else {
      return res.status(500).json({ message: "Internal server error!!" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    const bookDetails = await Book.findOne({
      where: {
        id: bookId,
      },
    });

    if (!bookDetails) {
      return res.status(500).json({ message: "Book doesnot exist!!" });
    }

    return res
      .status(200)
      .json({ message: "Book fetched successfully!!", bookDetails });
  } catch (error) {}
};

module.exports = {
  getAllBook,
  createBook,
  getBookById,
};
