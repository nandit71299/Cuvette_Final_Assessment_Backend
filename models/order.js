import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    items: {
      type: Array,
      required: true, // It's a good practice to specify whether this is required or not
    },
  },
  { timestamps: true }
); // Correctly placed here

const Order = mongoose.model("Order", schema);
export default Order;
