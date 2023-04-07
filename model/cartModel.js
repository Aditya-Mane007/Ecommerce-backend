const mongoose = require("mongoose")

const CartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    productInfo: {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      image: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true

      }
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Cart",CartSchema)
