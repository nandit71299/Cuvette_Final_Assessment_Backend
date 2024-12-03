import bcrypt from "bcrypt";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
import generateAuthToken from "../utils/generateAuthToken.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, country, phone } = req.body;

    // Validate required fields
    if (!name || !email || !password || !country || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Basic validation
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      country.length < 1 ||
      phone.length < 1
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    // Create the new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      country,
      phone,
    });

    // Save user to the database
    await user.save();
    const userData = user.toObject();
    delete userData.password;

    // Return success message
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
    const { name, email, country, phone } = req.body;

    // Validate required fields
    if (!name || !email || !country || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Basic validation
    if (
      name.length < 1 ||
      email.length < 1 ||
      country.length < 1 ||
      phone.length < 1
    ) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Check for existing user with the same email
    const existingUser = await User.findOne({ email: email });
    if (existingUser && existingUser._id.toString() !== id) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Update user information
    const user = await User.findByIdAndUpdate(
      id,
      { name, country, phone },
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

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate auth token
    const token = generateAuthToken(user.email);
    if (!token) {
      throw new Error("Internal Server Error");
    }

    // Send response
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        addresses: user.addresses,
        cards: user.cards,
      },
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

export const addCard = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cardNumber, expiryDate, cvc, nameOnCard } = req.body;

    // Validate the required fields
    if (!cardNumber || !expiryDate || !cvc || !nameOnCard) {
      return res.status(400).json({ error: "All card fields are required" });
    }

    // Find the user by ID and update the cards array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the new card to the cards array
    user.cards.push({ cardNumber, expiryDate, cvc, nameOnCard });
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Card added successfully",
      user: user.toObject(),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { userId, cardId } = req.params; // cardId is the _id of the card
    const { cardNumber, expiryDate, cvc, nameOnCard } = req.body;

    // Validate the required fields
    if (!cardNumber || !expiryDate || !cvc || !nameOnCard) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the card in the array by its _id
    const cardIndex = user.cards.findIndex(
      (card) => card._id.toString() === cardId
    );
    if (cardIndex === -1) {
      return res.status(404).json({ error: "Card not found" });
    }

    // Update the card
    user.cards[cardIndex] = {
      _id: user.cards[cardIndex]._id,
      cardNumber,
      expiryDate,
      cvc,
      nameOnCard,
    };
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Card updated successfully",
      user: user.toObject(),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { userId, cardId } = req.params; // cardId is the _id of the card to delete

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the card in the array by its _id
    const cardIndex = user.cards.findIndex(
      (card) => card._id.toString() === cardId
    );
    if (cardIndex === -1) {
      return res.status(404).json({ error: "Card not found" });
    }

    // Remove the card from the array
    user.cards.splice(cardIndex, 1);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Card deleted successfully",
      user: user.toObject(),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Add a new address to the user
export const addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { street, city, state, country, postalCode, phone, name } = req.body;

    let { isDefault } = req.body;
    // Validate the required fields
    if (
      !street ||
      !city ||
      !state ||
      !country ||
      !postalCode ||
      !phone ||
      !name
    ) {
      return res.status(400).json({ error: "All address fields are required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If isDefault is true or it's the first address, set it as default and remove default from others
    if (isDefault) {
      // Set all other addresses as non-default
      user.addresses.forEach((address) => (address.isDefault = false));
    } else if (user.addresses.length === 0) {
      // If no addresses exist, make this address the default
      isDefault = true; // First address should be default
    }

    // Add the new address
    user.addresses.push({
      street,
      city,
      state,
      country,
      postalCode,
      phone,
      name,
      isDefault: isDefault || false, // Default is false unless explicitly passed as true
    });

    // Save the new address
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address added successfully",
      user: user.toObject(),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params; // addressId is the _id of the address to update
    const {
      street,
      city,
      state,
      country,
      postalCode,
      phone,
      name,
      isDefault, // Pass the 'setDefault' as true or false
    } = req.body;

    // Validate the required fields
    if (
      !street ||
      !city ||
      !state ||
      !country ||
      !postalCode ||
      !phone ||
      !name
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the address in the array by its _id
    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res.status(404).json({ error: "Address not found" });
    }

    let isToSetDefault = isDefault;
    // If 'setDefault' is true, mark this address as the default and reset all other addresses
    if (isDefault) {
      // Set all other addresses as non-default
      user.addresses.forEach((address) => {
        address.isDefault = false;
      });

      // Set the current address as default
      user.addresses[addressIndex].isDefault = true;
      isToSetDefault = true;
    }

    // Update the address fields
    user.addresses[addressIndex] = {
      street,
      city,
      state,
      country,
      postalCode,
      phone,
      name,
      isDefault: isToSetDefault, // retain the default status if not updated
    };

    // Save the updated user document
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      user: user.toObject(),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params; // addressId is the _id of the address to delete

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the address in the array by its _id
    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Remove the address from the array
    user.addresses.splice(addressIndex, 1);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      user: user.toObject(),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
