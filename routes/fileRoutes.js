const express = require("express");
const router = express.Router();
const {
  uploadSingleFile,
  deleteFile,
} = require("../controllers/fileController.js");

//mentioning route for every operation
router.route("/").post(uploadSingleFile);
router.route("/:id").delete(deleteFile);

//router.route("/create").post(createAuthor);

//exporting routes to index page
module.exports = router;
