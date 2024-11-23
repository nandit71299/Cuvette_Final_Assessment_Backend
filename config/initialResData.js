import Restraunts from "../models/restraunts.js";

// Define restaurant data
const restaurantsData = [
  {
    name: "McDonald's",
    start_time: new Date("2024-11-23T09:00:00Z"),
    end_time: new Date("2024-11-23T23:59:59Z"),
    minimum_order: 5.0,
    delivery_time: 30, // 30 minutes
    address: "123 McDonald's St, London",
    latitude: "51.5074",
    longitude: "-0.1278",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/McDonald%27s_Logo_2018.svg", // McDonald's logo
    phone: "+44 123 456 7890",
    website: "https://www.mcdonalds.com",
  },
  {
    name: "KFC West London",
    start_time: new Date("2024-11-23T10:00:00Z"),
    end_time: new Date("2024-11-23T23:00:00Z"),
    minimum_order: 6.0,
    delivery_time: 35, // 35 minutes
    address: "456 KFC Rd, West London",
    latitude: "51.5072",
    longitude: "-0.1277",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/KFC_Logo_2011.svg", // KFC logo
    phone: "+44 987 654 3210",
    website: "https://www.kfc.co.uk",
  },
  {
    name: "Papa John's",
    start_time: new Date("2024-11-23T11:00:00Z"),
    end_time: new Date("2024-11-23T22:00:00Z"),
    minimum_order: 7.0,
    delivery_time: 25, // 25 minutes
    address: "789 Papa John's Ave, London",
    latitude: "51.5070",
    longitude: "-0.1280",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/Papa_John%27s_logo_2020.svg", // Papa John's logo
    phone: "+44 555 123 4567",
    website: "https://www.papajohns.co.uk",
  },
  {
    name: "Texas Chicken",
    start_time: new Date("2024-11-23T10:30:00Z"),
    end_time: new Date("2024-11-23T23:30:00Z"),
    minimum_order: 8.0,
    delivery_time: 40, // 40 minutes
    address: "321 Texas Chicken Blvd, London",
    latitude: "51.5060",
    longitude: "-0.1300",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e7/Texas_Chicken_Logo.svg", // Texas Chicken logo
    phone: "+44 777 123 9876",
    website: "https://www.texaschicken.com",
  },
  {
    name: "Burger King",
    start_time: new Date("2024-11-23T09:30:00Z"),
    end_time: new Date("2024-11-23T23:30:00Z"),
    minimum_order: 6.5,
    delivery_time: 30, // 30 minutes
    address: "123 Burger King Rd, London",
    latitude: "51.5090",
    longitude: "-0.1234",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/Burger_King_Logo_2020.svg", // Burger King logo
    phone: "+44 999 888 7777",
    website: "https://www.burgerking.co.uk",
  },
  {
    name: "Shaurma 1",
    start_time: new Date("2024-11-23T11:00:00Z"),
    end_time: new Date("2024-11-23T22:30:00Z"),
    minimum_order: 4.5,
    delivery_time: 20, // 20 minutes
    address: "555 Shaurma St, London",
    latitude: "51.5100",
    longitude: "-0.1210",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shaurma_logo.svg", // Shaurma logo
    phone: "+44 111 222 3333",
    website: "https://www.shaurma1.com",
  },
];

// Insert the data into the database
const insertRestaurants = async () => {
  try {
    // Iterate over each restaurant data
    for (let restaurant of restaurantsData) {
      // Check if the restaurant already exists by name (or other unique field like website)
      const existingRestaurant = await Restraunts.findOne({
        name: restaurant.name,
      });

      if (!existingRestaurant) {
        // If the restaurant doesn't exist, insert it
        await Restraunts.create(restaurant);
        console.log(`${restaurant.name} inserted.`);
      }
    }
  } catch (error) {
    console.error("Error inserting restaurants:", error);
  }
};

export default insertRestaurants;
