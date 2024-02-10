const express = require("express");
const router = express.Router();
const {
  getAllBook,
  createBook,
  getBookById,
} = require("../controllers/bookController.js");

//mentioning route for every operation
router.route("/").get(getAllBook);
router.route("/:id").get(getBookById);

router.route("/create").post(createBook);

//exporting routes to index page
module.exports = router;
