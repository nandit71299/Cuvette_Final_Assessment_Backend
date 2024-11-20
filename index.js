import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import connectDb from "./config/db.js";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);

connectDb()
  .then(() => {
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
