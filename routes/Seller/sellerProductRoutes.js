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
router.route("/:id").delete(protect,deletProduct).get(protect,getProductDetails)
router.route("/update/:id").put(protect,updateProduct)
module.exports = router
