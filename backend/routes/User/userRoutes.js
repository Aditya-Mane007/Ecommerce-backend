const express = require("express")
const router = express.Router()
const { protect } = require("../../middleware/userAuthMiddleware")

const {
  registerUser,
  loginUser,
  getUser
} = require("../../controllers/User/userController")

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/me", protect, getUser)

module.exports = router
