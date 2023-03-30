const express = require("express")
const router = express.Router()
const { protect } = require("../../middleware/sellerAuthMiddleware")
const upload = require("../../middleware/imageUploadMiddleware")
const {
  getALlProducts,
  createProduct,
  updateProduct,
  deletProduct,
  getProductDetails
} = require("../../controllers/Seller/sellerProductController")



router.get("/",protect,getALlProducts)
router.post("/add",protect,upload,createProduct)
router.route("/:id").put(protect,updateProduct).delete(protect,deletProduct).get(protect,getProductDetails)

module.exports = router
