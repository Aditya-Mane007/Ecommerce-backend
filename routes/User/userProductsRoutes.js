const express = require("express")
const {
  getAllProducts,
  addToCart
} = require("../../controllers/User/userProductController")
const { protect } = require("../../middleware/userAuthMiddleware")
const router = express.Router()

router.get("/",getAllProducts)
router.post("/:id",protect,addToCart)

module.exports = router
