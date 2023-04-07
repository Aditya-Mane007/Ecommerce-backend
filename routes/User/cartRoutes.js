const express = require("express")
const router = express.Router()
const {
  getAllProducts,
  addProducts,
  deleteProduct
} = require("../../controllers/User/cartController")
const { protect } = require("../../middleware/userAuthMiddleware")

router.get("/",protect,getAllProducts)
router.delete("/:id",protect,deleteProduct)
router.post("/add",protect,addProducts)

module.exports = router
