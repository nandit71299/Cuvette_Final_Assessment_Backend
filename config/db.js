import mongoose from "mongoose";

const connectDb = () =>
  mongoose.connect("mongodb://localhost:27017/orderdotuk");
export default connectDb;
