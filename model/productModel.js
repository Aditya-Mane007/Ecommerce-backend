const mongoose = require("mongoose")

const productSchma = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,"Please add the name of the product"],
      trim: true
    },
    description: {
      type: String,
      required: [true,"Please add the description of the product"]
    },
    price: {
      type: Number,
      required: [true,"Please add the price of product"],
      maxLength: 8
    },
    ratings: {
      type: Number,
      default: 0
    },
    image: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
    quantity: {
      type: String
    },
    category: {
      type: String,
      required: [true,"Please Enter product category"]
    },
    numberofReviews: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        name: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          required: true
        },
        comment: {
          type: String,
          required: true
        }
      }
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Product",productSchma)
