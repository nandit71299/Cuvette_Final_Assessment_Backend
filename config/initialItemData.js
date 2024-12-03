import Item from "../models/item.js";
import Restraunts from "../models/restraunts.js";

// Product data (same as before)
const itemData = [
  {
    title: "Royal Cheese Burger",
    price: 15.0,
    description:
      "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium fries",
    category: "Burgers",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrqFyc4VRE-R4vF3f7p5T6cjOJDm--xh6ZCA&s",
  },
  {
    title: "Big Mac",
    price: 8.5,
    description:
      "Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun",
    category: "Burgers",
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/DC_202302_0005-999_BigMac_1564x1564-1:product-header-mobile?wid=1313&hei=1313&dpr=off",
  },
  {
    title: "McChicken",
    price: 6.0,
    description:
      "Crispy chicken patty with mayo, lettuce, served on a soft bun",
    category: "Burgers",
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/DC_202012_0383_CrispyChickenSandwich_PotatoBun_1564x1564-1:nutrition-calculator-tile?resmode=sharp2",
  },
  {
    title: "Medium Fries",
    price: 2.5,
    description: "Crispy golden fries, perfect for pairing with any burger",
    category: "Fries",
    image:
      "https://images.eatthismuch.com/img/433558_renansantosifbb_6daa9040-88e9-4451-b07f-77fb136cf858.jpeg",
  },
  {
    title: "Coca Cola",
    price: 2.0,
    description: "Refreshing Coca Cola soft drink",
    category: "Cold Drinks",
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/DC_202402_0521_MediumCoke_ContourGlassv1_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off",
  },
];

// Dynamic product insertion
const seedProducts = async () => {
  try {
    // Find McDonald's restaurant by name (you can also use `website`, `address`, etc.)
    const mcdonalds = await Restraunts.findOne({ name: "McDonald's" });

    if (!mcdonalds) {
      console.log("McDonald's restaurant not found in the database.");
      return;
    }

    const mcdonaldsResId = mcdonalds._id.toString(); // McDonald's `resId`

    // Loop through each item in itemData and insert them with McDonald's `resId`
    for (const item of itemData) {
      // Ensure item has the correct `resId` (McDonald's)
      const itemWithResId = { ...item, resId: mcdonaldsResId };

      // Check if the item already exists in the database
      const existingItem = await Item.findOne({
        resId: mcdonaldsResId,
        title: item.title,
      });

      if (!existingItem) {
        // If the item doesn't exist, insert it into the database
        await Item.create(itemWithResId);
        console.log(
          `Product "${item.title}" added successfully for McDonald's!`
        );
      } else {
        // If the item already exists, skip it
        console.log(
          `Product "${item.title}" already exists for McDonald's, skipping.`
        );
      }
    }
  } catch (error) {
    console.error("Error adding demo products:", error);
  }
};

export default seedProducts;
