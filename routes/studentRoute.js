const express = require("express");
const router = express.Router();
const {
  createStudent,
  createStudnetBookMultipleRelation,
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  changePassword,
} = require("../controllers/studentController");

const login = require("../controllers/loginController.js");
const verifyToken = require("../middleware/verifyToken.js");

//mentioning route for every operation
router.route("/").get(verifyToken, getAllStudent);
router.route("/").post(createStudent);
router.route("/create").post(createStudnetBookMultipleRelation);
router.route("/:id").get(getStudentById);
router.route("/:id").put(updateStudent);
router.route("/:id").delete(deleteStudent);
router.route("/login").post(login);
router.route("/:id").patch(changePassword);

//exporting routes to index page
module.exports = router;
