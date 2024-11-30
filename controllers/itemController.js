import Item from "../models/item.js";

export const getAll = async (req, res) => {
  const resId = req.query.id; // Get the restaurant ID from the query params
  try {
    // Find all items with the given resId
    const items = await Item.find({ resId: resId });

    // If items are found, return them in the response
    if (items.length > 0) {
      return res.json({ success: true, items });
    }

    // If no items are found, send a response indicating no items available
    res.status(404).json({
      success: false,
      message: "No items found for this restaurant.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
