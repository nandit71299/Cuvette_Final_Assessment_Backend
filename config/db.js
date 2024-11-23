import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDb = () => mongoose.connect(process.env.DB_HOST);
export default connectDb;
