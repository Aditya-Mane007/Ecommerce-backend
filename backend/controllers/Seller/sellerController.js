const asyncHandler = require("express-async-handler")
const Seller = require("../../model/sellerModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerSeller = asyncHandler(async (req,res) => {
  const { name,email,password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Plase add all the fields")
  }
  const sellerExists = await Seller.findOne({ email })
  if (sellerExists) {
    res.status(400)
    throw new Error("User alredy exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashpassword = await bcrypt.hash(password,salt)

  const seller = await Seller.create({
    name,
    email,
    password: hashpassword
  })

  if (seller) {
    res.status(200).json({
      _id: seller.id,
      email: seller.email,
      token: generateToken(seller._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid User Data")
  }
})

const loginSeller = asyncHandler(async (req,res) => {
  const { email,password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error("Please add all the fields")
  }

  const seller = await Seller.findOne({ email })

  if (seller && (await bcrypt.compare(password,seller.password))) {
    res.status(200)
    res.json({
      _id: seller.id,
      name: seller.name,
      token: generateToken(seller._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid Credentionals")
  }
})

const getSeller = asyncHandler(async (req,res) => {
  res.status(200).json({
    seller: req.seller
  })
})
const generateToken = (id) => {
  return jwt.sign({ id },process.env.JWT_SECRET,{
    expiresIn: "1d"
  })
}
module.exports = {
  registerSeller,
  loginSeller,
  getSeller
}
