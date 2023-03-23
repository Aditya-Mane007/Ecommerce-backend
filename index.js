const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const port = process.env.PORT || 5000
const multer = require("multer")
const helmet = require("helmet")
const morgan = require("morgan")
const path = require("path")
const bodyParser = require("body-parser")
const dbConnect = require("./config/dbConnect")
dbConnect()

const { createProduct } = require("./controllers/Seller/sellerProductController")
const { protect } = require("./middleware/sellerAuthMiddleware")


const app = express()

// Middlewares
const errorHandler = require("./middleware/errorMiddleware")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb",extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb",extended: true }))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,"/assets")))

// Stroage
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,"/assets")
  },
  filename: (req,file,cb) => {
    cb(null,file.originalname)
  }
})

const upload = multer({ storage })
// Routes
app.use("/api/users",require("./routes/User/userRoutes"))
app.use("/api/users/cart",require("./routes/User/cartRoutes"))
app.use("/api/sellers",require("./routes/Seller/sellerRoutes"))
app.use("/api/sellers/product",require("./routes/Seller/sellerProductRoutes"))

app.use("/api/sellers/product/add",protect,upload.single("picture"),createProduct)

app.use("/api/users/products",require("./routes/User/userProductsRoutes"))
app.use("/api/users/cart",require("./routes/User/cartRoutes"))

app.use(errorHandler)



app.listen(port,() => {
  console.log(`Server is running on port ${port}`.blue.underline)
})
