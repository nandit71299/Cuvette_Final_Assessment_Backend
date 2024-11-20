import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const generateAuthToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export default generateAuthToken;
