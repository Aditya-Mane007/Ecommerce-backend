const express = require("express")
const router = express.Router()
const { protect } = require("../../middleware/sellerAuthMiddleware")

const {
  registerSeller,
  loginSeller,
  getSeller
} = require("../../controllers/Seller/sellerController")

router.post("/",registerSeller)
router.post("/login",loginSeller)
router.get("/me",protect,getSeller)

module.exports = router
