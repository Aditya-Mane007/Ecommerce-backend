const asyncHandler = require("express-async-handler")
const Cart = require("../../model/cartModel")
const Product = require("../../model/productModel")

const getAllProducts = asyncHandler(async (req,res) => {
  const products = await Product.find()

  res.status(200).json({
    products: products,
    message: "Fetch All the products"
  })
})

const getProduct = asyncHandler(async (req,res) => {
  const product = await Product.findById(req.params.id)
  res.status(200).json({
    product: product
  })
})

module.exports = {
  getAllProducts,
  getProduct,
}
