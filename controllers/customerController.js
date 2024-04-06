const Customer = require("../models/Customer");
const Products = require("../models/Product");

const createCustomer = async (req, res) => {
  const { customer_name, customer_address, customer_phone } = req.body;

  try {
    //chaeck whether  the customer having the same phone number alreadu exist or not
    //many customer cannot be registered with a single phone number for the  verification purpose
    const isPhoneExist = await Customer.findOne({
      where: {
        customer_phone,
      },
    });

    if (isPhoneExist)
      return res
        .status(500)
        .json({ message: "Customer with exact Phone number Already Exist!!!" });

    const createCustomer = await Customer.create({
      customer_name,
      customer_address,
      customer_phone,
    });

    if (createCustomer)
      return res
        .status(200)
        .json({ message: "Customer created successfully!" });
    else res.status(500).json({ message: "Failed to create Customer!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error!!!" });
  }
};

const getAllCustomer = async (req, res) => {
  try {
    const customerDetails = await Customer.findAll();
    console.log(customerDetails);

    if (customerDetails < 0)
      return res.status(500).json({ message: "No data exist!!" });
    else
      return res.status(200).json({
        message: "Customer fetched Successfully!!",
        customerDetails,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

module.exports = {
  createCustomer,
  getAllCustomer,
};
