import express from "express";
import UserRoutes from "./userRoutes/userRoutes.js";
import RestrauntRoutes from "./restrauntRoutes/restrauntRoutes.js";

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/restraunts", RestrauntRoutes);

export default router;
