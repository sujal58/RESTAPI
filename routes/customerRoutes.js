const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getAllCustomer,
} = require("../controllers/customerController");

router.route("/").get(getAllCustomer);
router.route("/").post(createCustomer);

module.exports = router;
