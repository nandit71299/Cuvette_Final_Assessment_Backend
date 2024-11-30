import express from "express";
import * as cartController from "../../controllers/cartController.js";
const router = express.Router();
import authMiddleware from "../../middlewares/authMiddleware.js";

router.post("/add-to-cart", authMiddleware, cartController.addToCart);
router.post("/remove-from-cart", authMiddleware, cartController.removeFromCart);
router.get("/getCart", authMiddleware, cartController.getCart);

// router.get("/getSingle", authMiddleware, restrauntController.getSingle);

export default router;
