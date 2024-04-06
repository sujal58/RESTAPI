const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student.js");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const StudentExist = await Student.findOne({
      where: {
        email,
      },
    });

    if (!StudentExist) {
      return res.status(404).json({ message: "Email not found!!!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      StudentExist.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          StudentId: StudentExist.id,
          email: StudentExist.email,
          mobileNumber: StudentExist.mobileNumber,
        },
        "secretKey",
        { expiresIn: 86400 }
      );
      if (token) {
        return res
          .status(200)
          .json({ message: "Logged in successfully!!!", token: token });
      } else {
        return res.status(500).json({ message: "INternal server Error" });
      }
    } else {
      return res.status(401).json({ message: "Invalid credential!!!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error!!" });
  }
};

module.exports = login;
