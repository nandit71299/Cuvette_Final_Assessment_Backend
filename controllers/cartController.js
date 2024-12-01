import Cart from "../models/cart.js";
import User from "../models/user.js";
import Item from "../models/item.js"; // Assuming you have a Products model for fetching product details
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const addToCart = async (req, res) => {
  try {
    const userEmail = req.user.email; // Assuming user is authenticated and email is available
    const { itemId } = req.body; // The ID of the product to add

    if (!userEmail || !itemId) {
      return res
        .status(400)
        .json({ error: "User email and Item ID are required" });
    }

    // Find user by email
    const findUser = await User.findOne({ email: userEmail });
    if (!findUser) {
      return res.status(400).json({ error: "Invalid User" });
    }

    // Fetch product details using the itemId (ensure the product exists)
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Find the user's cart (or create a new one if none exists)
    let userCart = await Cart.findOne({ user_id: findUser._id });

    if (!userCart) {
      // If the user doesn't have a cart yet, create a new cart
      userCart = new Cart({
        user_id: findUser._id,
        item: [], // Initialize an empty array for products
        totalPrice: 0,
      });
    }

    // Ensure the cart items are always an array
    if (!Array.isArray(userCart.item)) {
      userCart.item = [];
    }

    // Check if the product already exists in the cart
    const existingItemIndex = userCart.item.findIndex(
      (cartItem) => cartItem.item_id.toString() === itemId
    );

    if (existingItemIndex !== -1) {
      // If product exists, increment the quantity
      userCart.item[existingItemIndex].quantity++;
    } else {
      // If product does not exist in the cart, add it
      userCart.item.push({
        item_id: itemId,
        quantity: 1,
        price: item.price, // Store the price of the product in the cart
        image: item.image, // Assuming 'image' is the field in the Item model
      });
    }

    // Recalculate the total price of the cart
    userCart.totalPrice = userCart.item.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    // Save the updated cart
    await userCart.save();

    // Now, populate the cart with additional item details (title, description, price, and image)
    const populatedCart = await Cart.findOne({ user_id: findUser._id })
      .populate("item.item_id", "title description price image") // Populate item_id fields from Item model
      .exec();

    // Flatten the cart items to bring title, description, price, and image directly into the item object
    const flattenedItems = populatedCart.item.map((cartItem) => {
      const { item_id, quantity, price, image, _id } = cartItem;
      if (item_id) {
        const { title, description } = item_id;
        return {
          _id, // Cart item ID
          item_id: item_id._id, // Item ID
          title, // Item title
          description, // Item description
          price, // Item price
          image, // Item image URL
          quantity, // Quantity in the cart
        };
      }
    });

    // If the cart has no items, make sure to send an empty array for items
    const responseCart = flattenedItems.length > 0 ? flattenedItems : [];

    // Send the populated and flattened cart in the response
    res.json({
      success: true,
      message: "Item added to cart",
      cartId: userCart._id, // Include the cart ID
      cart: { item: responseCart, totalPrice: userCart.totalPrice },
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { itemId } = req.body;

    // Validate the input
    if (!userEmail || !itemId) {
      return res
        .status(400)
        .json({ error: "User email and Item ID are required" });
    }

    // Find user by email
    const findUser = await User.findOne({ email: userEmail });
    if (!findUser) {
      return res.status(400).json({ error: "Invalid User" });
    }

    // Find the user's cart
    let userCart = await Cart.findOne({ user_id: findUser._id });
    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Check if the item exists in the cart
    const existingItemIndex = userCart.item.findIndex(
      (cartItem) => cartItem.item_id.toString() === itemId
    );

    // If the item doesn't exist in the cart, return an error
    if (existingItemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Remove the product from the cart
    userCart.item.splice(existingItemIndex, 1);

    // Recalculate the total price of the cart
    userCart.totalPrice = userCart.item.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    // Save the updated cart
    await userCart.save();

    // Now, populate the cart with additional item details (title, description, price)
    const populatedCart = await Cart.findOne({ user_id: findUser._id })
      .populate("item.item_id", "title description price") // Populate item_id fields from Item model
      .exec();

    // Flatten the cart items to bring title, description, and price directly into the item object
    const flattenedItems = populatedCart.item.map((cartItem) => {
      const { item_id, quantity, price, _id } = cartItem;
      if (item_id) {
        const { title, description } = item_id;
        return {
          _id, // Cart item ID
          item_id: item_id._id, // Item ID
          title, // Item title
          description, // Item description
          price, // Item price
          quantity, // Quantity in the cart
        };
      }
    });

    // If the cart has no items, make sure to send an empty array for items
    const responseCart = flattenedItems.length > 0 ? flattenedItems : [];

    // Send the populated and flattened cart in the response
    res.json({
      success: true,
      message: "Item removed from cart",
      cartId: userCart._id, // Include the cart ID
      cart: { item: responseCart, totalPrice: userCart.totalPrice },
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const { authorization } = req.headers; // Get the token from Authorization header
    const cartId = req.query?.cartId; // Get cartId from query parameters

    let userEmail;
    let userId;

    // Step 1: Check for cartId first
    if (cartId) {
      // Try to fetch cart by cartId
      const userCart = await Cart.findOne({ _id: cartId })
        .populate("item.item_id", "title description price image")
        .exec();

      if (userCart) {
        // Flatten the cart items and return the response
        const flattenedItems = userCart.item.map((cartItem) => {
          const { item_id, quantity, price, _id, image } = cartItem;
          if (item_id) {
            const { title, description } = item_id;
            return {
              _id, // Cart item ID
              item_id: item_id._id, // Item ID
              title, // Item title
              description, // Item description
              price, // Item price
              image,
              quantity, // Quantity in the cart
            };
          }
        });

        // Update the cart object with the flattened items
        userCart.item = flattenedItems;

        // Send the populated and flattened cart in the response along with cart ID
        return res.json({
          success: true,
          cartId: userCart._id, // Include the cart ID
          cart: flattenedItems,
          message: "Cart fetched successfully",
        });
      } else {
        return res.status(404).json({ error: "Cart not found" });
      }
    }

    // Step 2: If no cartId, check for token in Authorization header
    if (authorization && authorization.startsWith("Bearer ")) {
      const token = authorization.split(" ")[1]; // Extract the token (remove "Bearer " prefix)

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        userEmail = decoded.email; // Assuming the token contains the email of the user
        userId = decoded._id; // Assuming the token contains the _id of the user
      } catch (err) {
        // Token verification failed but continue to return the cart data without associating it with a user
        userEmail = null; // No user email, will not associate the cart with a user
        userId = null; // No user ID, will not associate the cart with a user
      }
    }

    // Step 3: If neither cartId nor userEmail are found, return a bad request
    if (!userEmail && !cartId) {
      return res.status(400).json({ error: "No cartId or token provided" });
    }

    let userCart;

    // Step 4: If user is authenticated (we have the userEmail), try to fetch the user's cart
    if (userEmail) {
      const user = await User.findOne({ email: userEmail }).exec();
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      userId = user._id;

      // Fetch the user's cart using userId
      userCart = await Cart.findOne({ user_id: userId })
        .populate("item.item_id", "title description price image") // Populate item_id fields from Item model
        .exec();
    }

    // If cart not found, return an error
    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Step 5: Flatten the cart items
    const flattenedItems = userCart.item.map((cartItem) => {
      const { item_id, quantity, price, _id, image } = cartItem;
      if (item_id) {
        const { title, description } = item_id;
        return {
          _id, // Cart item ID
          item_id: item_id._id, // Item ID
          title, // Item title
          description, // Item description
          price, // Item price
          quantity, // Quantity in the cart
          image,
        };
      }
    });

    // Update the cart object with the flattened items
    userCart.item = flattenedItems;

    // Send the populated and flattened cart in the response along with cart ID
    return res.json({
      success: true,
      cartId: userCart._id, // Include the cart ID
      cart: flattenedItems,
      message: "Cart fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
