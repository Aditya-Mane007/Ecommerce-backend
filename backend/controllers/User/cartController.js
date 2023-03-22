const asyncHandler = require("express-async-handler")
const User = require("../../model/userModel")
const Cart = require("../../model/cartModel")

const getAllProducts = asyncHandler(async (req, res) => {
  if (!req.user.id) {
    res.status(400)
    throw new Error("User Not Found")
  }
  const products = await Cart.find({ user: req.user.id })
  res.status(200).json({
    products,
    message: "Get Products From Cart"
  })
})
// const addProducts = asyncHandler(async (req, res) => {
//   res.status(200).json({
//     message: "Get Products From Cart"
//   })
// })
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Cart.findById(req.params.id)
  if (!product) {
    res.status(400)
    throw new Error("Product Not Found")
  }
  if (!req.user) {
    res.status(400)
    throw new Error("User Not Found")
  }
  if (product.user.toString() !== req.user.id) {
    res.status(400)
    throw new Error("User Not Authorized")
  }
  await Cart.findByIdAndDelete(product)
  res.status(200).json({
    message: "Delete Products From Cart"
  })
})

module.exports = {
  getAllProducts,
  // addProducts,
  deleteProduct
}