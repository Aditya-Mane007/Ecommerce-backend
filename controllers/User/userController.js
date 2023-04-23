const asyncHandler = require("express-async-handler")
const User = require("../../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async (req,res) => {
  const { name,email,password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please add all the fields")
  }

  const userExsits = await User.findOne({ email })
  if (userExsits) {
    res.status(400)
    throw new Error("User Alredy Exsists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashpassword = await bcrypt.hash(password,salt)

  const user = await User.create({
    name,
    email,
    password: hashpassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid User Data")
  }
})

const loginUser = asyncHandler(async (req,res) => {
  const { email,password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error("Please add all the fields")
  }

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password,user.password))) {
    res.status(200)
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid Credentionals")
  }
})

const getUser = asyncHandler(async (req,res) => {
  res.status(200).json({
    user: req.user
  })
})
const generateToken = (id) => {
  return jwt.sign({ id },process.env.JWT_SECRET,{
    expiresIn: "30d"
  })
}
module.exports = {
  registerUser,
  loginUser,
  getUser
}
