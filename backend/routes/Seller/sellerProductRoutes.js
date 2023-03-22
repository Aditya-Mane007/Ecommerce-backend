const express = require("express")
const router = express.Router()
const { protect } = require("../../middleware/sellerAuthMiddleware")
const {
  getALlProducts,
  createProduct,
  updateProduct,
  deletProduct
} = require("../../controllers/Seller/sellerProductController")

router.get("/", protect, getALlProducts)
router.post("/new", protect, createProduct)
router.route("/:id").put(protect, updateProduct).delete(protect, deletProduct)

module.exports = router
