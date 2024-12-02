import express from "express";
import * as restrauntController from "../../controllers/restrauntController.js";
const router = express.Router();
import authMiddleware from "../../middlewares/authMiddleware.js";

router.get("/getAll", restrauntController.getAll);
router.get("/getSingle", authMiddleware, restrauntController.getSingle);

export default router;
