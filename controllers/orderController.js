import Order from "../models/order.js";
import User from "../models/user.js";

export const createOrder = async (req, res) => {
  try {
    // Log the body to check its structure

    const { items, address } = req.body;
    const { user } = req;

    if (!items || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "Items should be an array" });
    }

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "You are not authorized." });
    }

    const findUser = await User.findOne({ email: user.email });
    if (!findUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const newOrder = new Order({
      user_id: findUser._id,
      items,
      address,
    });

    await newOrder.save();

    return res.json({ success: true, order: newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
