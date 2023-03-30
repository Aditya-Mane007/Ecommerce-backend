const multer = require("multer")

const storage = multer.memoryStorage()

const upload = multer({ storage: storage }).single("image")

module.exports = upload