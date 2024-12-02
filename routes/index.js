import express from "express";
import UserRoutes from "./userRoutes/userRoutes.js";
import RestrauntRoutes from "./restrauntRoutes/restrauntRoutes.js";
import ItemRoutes from "./itemRoutes/itemRoutes.js";
import CartRoutes from "./cartRoutes/cartRoutes.js";
import OrderRoutes from "./orderRoutes/orderRoutes.js";
const router = express.Router();

router.use("/users", UserRoutes);
router.use("/restraunts", RestrauntRoutes);
router.use("/items", ItemRoutes);
router.use("/cart", CartRoutes);
router.use("/orders", OrderRoutes);
export default router;
