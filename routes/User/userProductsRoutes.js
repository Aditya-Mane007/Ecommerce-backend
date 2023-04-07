const express = require("express")
const {
  getAllProducts,
  addToCart,
  getProduct
} = require("../../controllers/User/userProductController")
const { protect } = require("../../middleware/userAuthMiddleware")
const router = express.Router()

router.get("/",getAllProducts)
router.route("/:id").get(getProduct)

module.exports = router
