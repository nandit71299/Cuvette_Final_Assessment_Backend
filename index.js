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
import path from "path";

// ES Module workaround for __dirname
const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/status", (req, res) => {
  res.send("API is running");
});

app.use("/api", routes);

// Verify Token Route
app.get("/api/verifyToken", authMiddleware, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  res.status(200).json({
    success: true,
    message: "Token is valid",
    user: user,
  });
});

app.use(
  "/api/categories/images",
  express.static(path.join(process.cwd(), "public/assets/categories"))
);
app.use(
  "/api/deals/images",
  express.static(path.join(process.cwd(), "public/assets/deals"))
);
app.use(
  "/api/general/images",
  express.static(path.join(process.cwd(), "public/assets/general"))
);

connectDb()
  .then(() => {
    insertRestaurants().then(() => {
      seedProducts().then(() => {
        console.log("Initial data inserted");
      });
    });
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
