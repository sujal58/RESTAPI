const express = require("express");
const router = express.Router();
const {
  createAuthor,
  getAllAuthor,
} = require("../controllers/AuthorController.js");

//mentioning route for every operation
router.route("/").get(getAllAuthor);
router.route("/create").post(createAuthor);

//exporting routes to index page
module.exports = router;
