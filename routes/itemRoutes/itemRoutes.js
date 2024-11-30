import express from "express";
import * as itemController from "../../controllers/itemController.js";
const router = express.Router();
import authMiddleware from "../../middlewares/authMiddleware.js";

router.get("/getAll", authMiddleware, itemController.getAll);

// router.get("/getSingle", authMiddleware, restrauntController.getSingle);

export default router;
