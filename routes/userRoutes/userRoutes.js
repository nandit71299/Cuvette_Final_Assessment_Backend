import express from "express";
import * as userController from "../../controllers/userController.js";
const router = express.Router();
import authMiddleware from "../../middlewares/authMiddleware.js";

router.get("/", async (req, res) => {
  res.send("Welcome to users Rotue");
});

router.post("/signup", userController.signUp);
router.put("/update", authMiddleware, userController.updateUser);
router.post("/signin", userController.signIn);

export default router;
