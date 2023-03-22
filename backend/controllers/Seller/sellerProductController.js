const asyncHandler = require("express-async-handler")
const Product = require("../../model/productModel")

// Sellers
const getALlProducts = asyncHandler(async (req,res) => {
  const products = await Product.find({ seller: req.seller.id })
  res.status(200).json({
    products: products,
    message: "get All products"
  })
})

const createProduct = asyncHandler(async (req,res) => {
  const { name,description,price } = req.body
  if (!name || !description || !price) {
    res.status(400)
    throw new Error("Please add the fields")
  }
  const product = await Product.create({
    name,
    description,
    price,
    seller: req.seller.id
  })
  if (product) {
    res.status(200).json({
      name,
      description,
      price,
      seller: req.seller.id
    })
  } else {
    res.status(400)
    throw new Error("Invalid Product Data")
  }
})
const updateProduct = asyncHandler(async (req,res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(400)
    throw new Error("Product Not Found")
  }
  if (!req.seller.id) {
    res.status(400)
    throw new Error("Seller Not Found")
  }
  if (product.seller.toString() !== req.seller.id) {
    res.status(400)
    throw new Error("Seller Not Authorized")
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    }
  )
  if (updatedProduct) {
    res.status(200).json({
      product: updatedProduct,
      message: "Product Update"
    })
  }
})
const deletProduct = asyncHandler(async (req,res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(400)
    throw new Error("Product Not Found")
  }
  if (!req.seller) {
    res.status(400)
    throw new Error("Seller Not Found")
  }
  if (product.seller.toString() !== req.seller.id) {
    res.status(400)
    throw new Error("Seller Not Authorized")
  }

  await Product.findByIdAndDelete(req.params.id)

  res.status(200).json({
    id: req.params.id,
    message: "Delte Product"
  })
})

module.exports = {
  getALlProducts,
  createProduct,
  updateProduct,
  deletProduct
}
