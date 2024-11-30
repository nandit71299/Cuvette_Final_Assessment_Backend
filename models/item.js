import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ["Burgers", "Fries", "Cold Drinks"],
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restraunts", // Reference to the Restraunts model
    required: true, // Ensure every product has an associated restaurant
  },
});

const Item = mongoose.model("Item", schema);

export default Item;
