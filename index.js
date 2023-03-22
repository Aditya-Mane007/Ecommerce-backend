const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const port = process.env.PORT || 5000
const dbConnect = require("./config/dbConnect")
dbConnect()
const app = express()

// Middlewares
const errorHandler = require("./middleware/errorMiddleware")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use("/api/users", require("./routes/User/userRoutes"))
app.use("/api/users/cart", require("./routes/User/cartRoutes"))
app.use("/api/sellers", require("./routes/Seller/sellerRoutes"))
app.use("/api/sellers/product", require("./routes/Seller/sellerProductRoutes"))
app.use("/api/users/products", require("./routes/User/userProductsRoutes"))
app.use("/api/users/cart", require("./routes/User/cartRoutes"))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.blue.underline)
})
