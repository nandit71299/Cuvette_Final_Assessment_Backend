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
router.post("/:userId/cards", userController.addCard); // Add card
router.put("/:userId/cards/:cardId", userController.updateCard); // Update card
router.delete("/:userId/cards/:cardId", userController.deleteCard); // Delete card

// Address routes
router.post("/:userId/addresses", userController.addAddress); // Add address
router.put("/:userId/addresses/:addressId", userController.updateAddress); // Update address
router.delete("/:userId/addresses/:addressId", userController.deleteAddress); // Delete address

export default router;
