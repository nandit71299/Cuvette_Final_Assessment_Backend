import mongoose from "mongoose";

// Define the address schema to store individual address details
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  isDefault: { type: Boolean, default: false }, // New field to indicate if it's the default address
});

const cardsSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvc: { type: Number, required: true },
  nameOnCard: { type: String, required: true },
});

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  phone: { type: String, required: true },
  addresses: [addressSchema],
  cards: [cardsSchema],
});

const User = mongoose.model("User", schema);

export default User;
