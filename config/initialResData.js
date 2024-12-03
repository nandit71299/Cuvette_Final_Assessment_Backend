import Restraunts from "../models/restraunts.js";

const BACKEND_URI = process.env.BACKEND_URI;

// Define restaurant data
const restaurantsData = [
  {
    name: "McDonald's",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/McDonald%27s_square_2020.svg/800px-McDonald%27s_square_2020.svg.png",
    slogan: "I'm lovin' it",
    start_time: new Date("2024-11-23T09:00:00Z"),
    end_time: new Date("2024-11-23T23:59:59Z"),
    minimum_order: 5.0,
    delivery_time: 30, // 30 minutes
    address: "123 McDonald's St, London",
    latitude: "51.5074",
    longitude: "-0.1278",
    image: `${BACKEND_URI}/general/images/resBgImg.png`,
    phone: "+44 123 456 7890",
    website: "https://www.mcdonalds.com",
  },
  {
    name: "KFC West London",
    slogan: "So good",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/1200px-KFC_logo-image.svg.png",
    start_time: new Date("2024-11-23T10:00:00Z"),
    end_time: new Date("2024-11-23T23:00:00Z"),
    minimum_order: 6.0,
    delivery_time: 35, // 35 minutes
    address: "456 KFC Rd, West London",
    latitude: "51.5072",
    longitude: "-0.1277",
    image: `${BACKEND_URI}/general/images/resBgImg.png`,
    phone: "+44 987 654 3210",
    website: "https://www.kfc.co.uk",
  },
  {
    name: "Papa John's",
    slogan: "Better ingredients. Better pizza.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa5GuinHJRNoSEEQJVFSXnwCxGoBkbIo2W-gDkOXezENPeW34QAc6DL6Hcn7Pxxfnm4ek&usqp=CAU",
    start_time: new Date("2024-11-23T11:00:00Z"),
    end_time: new Date("2024-11-23T22:00:00Z"),
    minimum_order: 7.0,
    delivery_time: 25, // 25 minutes
    address: "789 Papa John's Ave, London",
    latitude: "51.5070",
    longitude: "-0.1280",
    image: `${BACKEND_URI}/general/images/resBgImg.png`,
    phone: "+44 555 123 4567",
    website: "https://www.papajohns.co.uk",
  },
  {
    name: "Texas Chicken",
    slogan: "We're the taste of Texas and we can't be mimicked",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKHA1hvK6i2w7qNgOH-z-tH3EOxu_-xb0GKA&s",
    start_time: new Date("2024-11-23T10:30:00Z"),
    end_time: new Date("2024-11-23T23:30:00Z"),
    minimum_order: 8.0,
    delivery_time: 40, // 40 minutes
    address: "321 Texas Chicken Blvd, London",
    latitude: "51.5060",
    longitude: "-0.1300",
    image: `${BACKEND_URI}/general/images/resBgImg.png`,
    phone: "+44 777 123 9876",
    website: "https://www.texaschicken.com",
  },
  {
    name: "Burger King",
    slogan: "You Rule",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/1200px-Burger_King_2020.svg.png",
    start_time: new Date("2024-11-23T09:30:00Z"),
    end_time: new Date("2024-11-23T23:30:00Z"),
    minimum_order: 6.5,
    delivery_time: 30, // 30 minutes
    address: "123 Burger King Rd, London",
    latitude: "51.5090",
    longitude: "-0.1234",
    image: `${BACKEND_URI}/general/images/resBgImg.png`,
    phone: "+44 999 888 7777",
    website: "https://www.burgerking.co.uk",
  },
  {
    name: "Shaurma 1",
    slogan: "Where Taste and Tradition Meet in Every Shaurma Bite.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc-flscwTLM2b3d1__NALp-gEP-Vz5eahHhA&s",
    start_time: new Date("2024-11-23T11:00:00Z"),
    end_time: new Date("2024-11-23T22:30:00Z"),
    minimum_order: 4.5,
    delivery_time: 20, // 20 minutes
    address: "555 Shaurma St, London",
    latitude: "51.5100",
    longitude: "-0.1210",
    image: `${BACKEND_URI}/general/images/resBgImg.png`,
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
