import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import connectDb from "./config/db.js";
import cors from "cors";
import routes from "./routes/index.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import insertRestaurants from "./config/initialResData.js";
import seedProducts from "./config/initialItemData.js";
import User from "./models/user.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);
app.get("/api/verifyToken", authMiddleware, async (req, res) => {
  // If the token is valid, the request will reach here

  const user = await User.findOne({ email: req.user.email });
  res.status(200).json({
    success: true,
    message: "Token is valid",
    user: user,
  });
});
connectDb()
  .then(() => {
    insertRestaurants();
    seedProducts();
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  });
