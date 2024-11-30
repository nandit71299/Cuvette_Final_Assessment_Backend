import Restraunts from "../models/restraunts.js";

export const getAll = async (req, res) => {
  try {
    const restraunts = await Restraunts.find({});
    res.json({ success: true, restraunts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSingle = async (req, res) => {
  try {
    const { id } = req.query;

    const restraunt = await Restraunts.findById(id);
    if (!restraunt) {
      return res
        .status(404)
        .json({ success: false, message: "Restraunt not found" });
    }
    res.json({ success: true, restraunt });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
