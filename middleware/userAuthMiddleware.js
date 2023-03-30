const asyncHandler = require("express-async-handler")
const User = require("../model/userModel")
const jwt = require("jsonwebtoken")

const protect = asyncHandler(async (req,res,next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = await jwt.verify(token,process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select("-password")
      next()
    } catch (error) {
      console.log(error)
      res.status(400)
      throw new Error(error.message)
    }
  } else {
    res.status(401)
    throw new Error("Not Authorized")
  }

  if (!token) {
    res.status(400)
    throw new Error("No Token,Not Authorized")
  }
})

module.exports = { protect }
