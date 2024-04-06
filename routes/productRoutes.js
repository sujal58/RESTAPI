const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProduct,
} = require("../controllers/productController");

router.route("/").get(getAllProduct);
router.route("/").post(createProduct);

module.exports = router;
