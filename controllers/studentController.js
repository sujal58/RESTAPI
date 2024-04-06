//@desc create Student
//@route post /api/users
//@access public
const { Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const studentBook = require("../models/studentbook");
const Book = require("../models/Book");

const createStudent = async (req, res) => {
  try {
    const existingEmail = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });

    const allowedGenderValue = ["male", "female", "others"];
    const enterGenderValue = req.body.gender;
    if (!allowedGenderValue.includes(enterGenderValue.toLowerCase())) {
      return res
        .status(400)
        .json({ message: "Invalid gender. Must be male, female or others" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exist!!" });
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    if (!hashPassword) {
      return res.status(500).json({ message: "Internal server error!!" });
    }

    const newStudent = await Student.create({
      fullname: req.body.fullname,
      email: req.body.email,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
      password: hashPassword,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
    });

    if (newStudent) {
      return res.status(201).json({ message: "Student Created Succesfully!!" });
    } else {
      return res.status(500).json({ message: "Internal Server Error!!" });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

const createStudnetBookMultipleRelation = async (req, res) => {
  console.log("multiple");
  const { StudentId, BookId } = req.body;
  console.log(StudentId, BookId);
  try {
    // Check if the student exists
    const isStudentExist = await Student.findByPk(StudentId);
    if (!isStudentExist) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the book exists
    const isBookExist = await Book.findByPk(BookId);
    if (!isBookExist) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newStudentBookRealtion = await studentBook.create({
      StudentId,
      BookId,
    });

    if (newStudentBookRealtion) {
      return res.status(201).json({
        message: "Student and Book Relation Created Successfully!!",
        data: newStudentBookRealtion,
      });
    } else {
      return res
        .status(500)
        .json({ message: "Cannot Create Relation between Student and Book" });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal Server Error!!" });
  }
};

const getAllStudent = async (req, res) => {
  console.log("get all Student");

  try {
    const allStudentDetails = await Student.findAll({
      attributes: {
        exclude: "password",
      },
      include: {
        model: Book,
      },
    });
    if (allStudentDetails.length > 0) {
      return res.status(200).json({
        message: "Student fetched successfully!!",
        data: allStudentDetails,
      });
    } else {
      return res.status(500).json({ message: "Internal server error!!" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
};

const getStudentById = async (req, res) => {
  const StudentId = req.params.id;
  try {
    const searchStudentDetails = await Student.findOne({
      where: { id: StudentId },
    });
    if (searchStudentDetails) {
      res.status(200).json({
        message: "Student found successfully!!",
        data: searchStudentDetails,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

const updateStudent = async (req, res) => {
  const StudentId = req.params.id;
  try {
    const StudentData = await Student.findOne({
      where: {
        id: StudentId,
      },
    });

    const existingEmail = await Student.findOne({
      where: {
        email: req.body.email,
        id: { [Sequelize.Op.not]: StudentId }, //exclude the current Student from the check
      },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exist!!" });
    }

    if (StudentData) {
      const updatedStudent = await StudentData.update({
        fullname: req.body.fullname,
        email: req.body.email,
        address: req.body.address,
        mobileNumber: req.body.mobileNumber,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
      });
    }

    if (updatedStudent) {
      return res.status(201).json({ message: "Student Updated Succesfully!!" });
    } else {
      return res.status(500).json({ message: "Internal Server Error!!" });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

const deleteStudent = async (req, res) => {
  const StudentToBeDeleted = req.params.id;
  try {
    const deletedStudent = await Student.findOne({
      where: {
        id: StudentToBeDeleted,
      },
    });

    if (deletedStudent) {
      await deletedStudent.destroy();
      res.status(200).json({
        message: `Student having id ${StudentToBeDeleted} Deleted Successfully!!!`,
      });
    } else {
      res.status(404).json({ message: "Student not found!!!!!!" });
    }
  } catch (error) {
    console.log("Error Found!!!", error);
    res.status(500).json({ message: "Internal server Error!!!!" });
  }
};

const changePassword = async (req, res) => {
  const StudentId = req.params.id;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  try {
    const StudentData = await Student.findOne({
      where: {
        id: StudentId,
      },
    });

    const checkOldPassword = StudentData.password;
    const isOldPasswordValid = bcrypt.compareSync(
      oldPassword,
      checkOldPassword
    );
    console.log(isOldPasswordValid);
    if (!isOldPasswordValid) {
      return res
        .status(401)
        .json({ message: "old Password doesnot match!!!!!!" });
    }

    if (newPassword !== confirmNewPassword) {
      res.status(401).json({ message: "Password doesnot match!!!!" });
    }

    if (StudentData) {
      const hashNewPassword = await bcrypt.hashSync(newPassword, 10);
      const updatePassword = await StudentData.update({
        password: hashNewPassword,
      });

      if (updatePassword) {
        return res
          .status(200)
          .json({ message: "Password Updated successfully" });
      } else {
        res.status(500).json({ message: "Couldnot change password" });
      }
    } else {
      res.status(404).json({ message: "Student not found!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal sever Error" });
  }
};

module.exports = {
  createStudent,
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  changePassword,
  createStudnetBookMultipleRelation,
};
