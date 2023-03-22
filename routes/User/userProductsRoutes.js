const express = require("express")
const {
  getAllProducts,
  addToCart
} = require("../../controllers/User/userProductController")
const { protect } = require("../../middleware/userAuthMiddleware")
const router = express.Router()

router.get("/", protect, getAllProducts)
router.post("/:id", protect, addToCart)

module.exports = router
