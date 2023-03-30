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

const addToCart = asyncHandler(async (req,res) => {
  const product = Product.findById(req.params.id)
  if (!product) {
    res.status(400)
    throw new Error("Product Not Found")
  }
  if (!req.user) {
    throw new Error("User not Found")
  }
  const cart = await Cart.create({
    user: req.user.id,
    productInfo: req.params.id,
    quantity: 1
  })
  res.status(200).json({
    products: cart,
    message: "Fetch All the products"
  })
})

module.exports = {
  getAllProducts,
  addToCart
}
