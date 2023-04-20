const express = require('express')
const router = express.Router()
const { checkout,verifyPayment } = require("../controllers/paymentController")

router.post("/checkout",checkout)
router.post("/veification",verifyPayment)
module.exports = router