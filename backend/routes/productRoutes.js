const router = require("express").Router();
const Product = require('../models/productModel')

const authMiddleware = require("../middlewares/authMiddleware");


router.get("/get-all-products", authMiddleware, async (_, response) => {
    try {
      const products = await Product.find();
      response.send({
        success: true,
        message: "Products Fetched Successfully",
        data: products  
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  });


  module.exports = router; 