import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
  },
  slogan: {
    type: String,
    trim: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  minimum_order: {
    type: Number,
    required: true,
    min: 0,
  },
  delivery_time: {
    type: Number,
    required: true,
    min: 0,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  website: { type: String, required: true },
});
const Restraunts = mongoose.model("Restraunts", schema);

export default Restraunts;
