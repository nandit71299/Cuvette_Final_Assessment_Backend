import mongoose from "mongoose";

// Define schema for the Cart
const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the 'User' model
    required: true,
  },
  item: [
    {
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item", // Reference to the 'Item' model (or Products)
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Quantity should always be at least 1
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  deliveryFee: {
    type: Number,
    default: 5, // Default delivery fee
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Cart model
const Cart = mongoose.model("Cart", schema);

export default Cart;
