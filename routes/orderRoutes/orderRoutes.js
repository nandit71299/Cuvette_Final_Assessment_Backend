import express from "express";
import * as orderController from "../../controllers/orderController.js";
const router = express.Router();
import authMiddleware from "../../middlewares/authMiddleware.js";

router.post("/create", authMiddleware, orderController.createOrder);

export default router;
