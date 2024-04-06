//@desc create user
//@route post /api/users
//@access public

const Author = require("../models/Author.js");

const createAuthor = async (req, res) => {
  try {
    const newAuthor = await Author.create({
      fullname: req.body.fullname,
      address: req.body.address,
    });

    if (newAuthor) {
      return res.status(201).json({ message: "User Created Succesfully!!" });
    } else {
      return res.status(500).json({ message: "Internal Server Error!!" });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

const getAllAuthor = async (req, res) => {
  console.log("get all user");

  try {
    const allUserDetails = await Author.findAll();
    if (allUserDetails.length > 0) {
      return res
        .status(200)
        .json({ message: "User fetched successfully!!", data: allUserDetails });
    } else {
      return res.status(500).json({ message: "Cannot fetch data!!" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
};

module.exports = {
  createAuthor,
  getAllAuthor,
};
