import bcrypt from "bcrypt";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
import generateAuthToken from "../utils/generateAuthToken.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, country } = req.body;
    if (!name || !email || !password || !country) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      country.length < 1
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }
    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    console.log(hashedPassword);

    // create new user object
    const user = new User({ name, email, password: hashedPassword, country });

    // save user to database
    await user.save();
    const userData = user.toObject();
    delete userData.password;
    return res.json({
      success: true,
      user: userData,
      message: "Sign-up successful",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, email, password, country } = req.body;

    if (!name || !email || !password || !country) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      country.length < 1
    ) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    // check if email already exists (excluding the current user)
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // hash password if provided

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password, country },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      user,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateAuthToken(user.email);
    if (!token) {
      throw new Error("Internal Server Error");
    }
    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token,
      message: "Sign-in successful",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
