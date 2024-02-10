const Customer = require("../models/Customer");
const Products = require("../models/Product");

const createProduct = async (req, res) => {
  const { product_name, product_Price, customerId } = req.body;

  try {
    const isCustomerExist = await Customer.findByPk(customerId);

    if (!isCustomerExist)
      return res.status(500).json({ message: "Customer doesnot Exist!!!" });

    const createProduct = await Products.create({
      product_name,
      product_Price,
      customerId,
    });

    return res.status(200).json({ message: "Product created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error!!!" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const productDetails = await Products.findAll({
      include: Customer,
      attributes: {
        exclude: "id",
      },
    });

    if (!productDetails)
      return res.status(500).json({ message: "No data exist!!" });
    else
      return res.status(200).json({
        message: "Product fetched Successfully!!",
        productDetails,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!!!" });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
};
