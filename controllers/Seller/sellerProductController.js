const asyncHandler = require("express-async-handler")
const Product = require("../../model/productModel")
const dataUri = require("../../utils/dataUri")

const cloudinary = require("cloudinary").v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})


// Sellers
const getALlProducts = asyncHandler(async (req,res) => {
  const products = await Product.find({ seller: req.seller.id })
  res.status(200).json({
    products: products,
    message: "get All products"
  })
})


const getProductDetails = asyncHandler(async (req,res) => {
  const product = await Product.findById(req.params.id)
  res.status(200).json({
    product: product
  })
})

const createProduct = asyncHandler(async (req,res) => {
  const { name,description,price,quantity,category } = req.body
  const image = req.file

  if (!name || !description || !price || !quantity || !category || !image) {
    res.status(400)
    throw new Error("Please add all fields")
  }
  const fileUri = dataUri(image)
  console.log(fileUri)
  const myCloud = await cloudinary.uploader.upload(fileUri.content)
  if (!req.seller) {
    throw new Error("Not Authorized")
  }
  const product = await Product.create({
    name,
    description,
    price,
    quantity,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    },
    category,
    seller: req.seller.id
  })

  if (product) {
    res.status(201).json({
      product: product,
      message: "Prouct Created"
    })
  } else {
    res.status(400)
    throw new Error("Invalid product data")
  }
})
const updateProduct = asyncHandler(async (req,res) => {
  const product = await Product.findById(req.params.id)
  const { name,description,price,quantity,category } = req.body
  const image = req.file
  if (!product) {
    res.status(400)
    throw new Error("Product Not Found")
  }
  // const fileUri = dataUri(image)
  // console.log(image)
  const myCloud = await cloudinary.uploader.upload(image)
  if (!req.seller.id) {
    res.status(400)
    throw new Error("Seller Not Found")
  }
  if (product.seller.toString() !== req.seller.id) {
    res.status(400)
    throw new Error("Seller Not Authorized")
  }
  // const updatedDetails = {}
  // if (name) updatedDetails.name = name
  // if (description) updatedDetails.description = description
  // if (price) updatedDetails.price = price
  // if (quantity) updatedDetails.quantity = quantity
  // if (category) updatedDetails.category = category
  const updatedDetails = {
    name,
    description,
    price,
    quantity,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    },
    category,
    seller: req.seller.id
  }
  console.log(updatedDetails)
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    // { $set: updatedDetails },
    updatedDetails,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
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

  await cloudinary.v2.uploader.destroy(product.images[i].public_id)
  await Product.findByIdAndDelete(req.params.id)
  res.status(200).json({
    id: req.params.id,
    message: "Delete Product"
  })
})

module.exports = {
  getALlProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deletProduct
}
