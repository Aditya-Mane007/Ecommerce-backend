const mongoose = require("mongoose")

const sellerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,"Please add a name"]
    },
    email: {
      type: String,
      required: [true,"Please add an email"]
    },
    password: {
      type: String,
      required: [true,"Please add a password"]
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Seller",sellerSchema)
