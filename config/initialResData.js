import Restraunts from "../models/restraunts.js";

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
    image:
      "https://www.figma.com/file/PwcM13xK4XBCiuX2M1iuOL/image/be11353a02f4b1476ff7565a60acdccf6f4f0dce",
    phone: "+44 123 456 7890",
    website: "https://www.mcdonalds.com",
  },
  {
    name: "KFC West London",
    slogan: "So good",
    logo: "https://s3-alpha-sig.figma.com/img/cee9/a037/eee4a6c405738978c52640f58f41fa5d?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M6MZ9SWu46JL7o~5KTAZicJFRgGKGZMCHPsC-kd7UWuQnekC7J9Kbs404qNWLZRJPMH-6cGjoIVxi4dNdi8K~qZSUa33eRKC-mxZa9ZH7oop8OX4~gKnNLcnu5RUOh0mDskcEVQkiUXtBH8xAN3VXxLdD3DpKGw1mPiKw7BCJRYEYQIJgosMUCWjH-chootV0a~2tzYJaWKKNzir0tnMo8YOH1o2yRxK3lwVa6tHFtO52kkTtoqMZvSfWHwUSvSoEfuCJ9F8TeoG2pH5QjIgNiHH92DH5XD1gZ1nZ3IVEN-OBwEus~f636RRrfwebCWn7~JDERMk0tytDhf90inQIg__",
    start_time: new Date("2024-11-23T10:00:00Z"),
    end_time: new Date("2024-11-23T23:00:00Z"),
    minimum_order: 6.0,
    delivery_time: 35, // 35 minutes
    address: "456 KFC Rd, West London",
    latitude: "51.5072",
    longitude: "-0.1277",
    image:
      "https://www.figma.com/file/PwcM13xK4XBCiuX2M1iuOL/image/be11353a02f4b1476ff7565a60acdccf6f4f0dce",
    phone: "+44 987 654 3210",
    website: "https://www.kfc.co.uk",
  },
  {
    name: "Papa John's",
    slogan: "Better ingredients. Better pizza.",
    logo: "https://s3-alpha-sig.figma.com/img/0799/9f0e/46ed7db7a5f6e5cfbd19ecc1d806c96a?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jlSVIIcSYKWutcL5aPk5fpU-i3XN3DAIcvNXb-j27r5hHFt5tzsPnvcdBpEffWSxYj9EXC5ha8QQQvGhLOq9AuLHQhwkG695QNcjTMPO2xIx9AD0W2Aetlv8hDeCqKWcMh1Q5ZzZk-lL3e21X-Iv5YP5z5YeIlJn8cuhBE4yb~mm5b3A8iC7tCD-48vZF9XbnoedtrB40J82Vb2z73akYJEhPqq8oBNvgMe2bQw-9hnvX9juupVdGLHJCRpz1EMg-Cq5hUq4~Kz22XK9zn7c48-DCVy3bhZeW4nsNbiFm72sdSoWTFY5LSjrdHhvFTN~xmpugzbcdMzeyKJZJDCiSw__",
    start_time: new Date("2024-11-23T11:00:00Z"),
    end_time: new Date("2024-11-23T22:00:00Z"),
    minimum_order: 7.0,
    delivery_time: 25, // 25 minutes
    address: "789 Papa John's Ave, London",
    latitude: "51.5070",
    longitude: "-0.1280",
    image:
      "https://www.figma.com/file/PwcM13xK4XBCiuX2M1iuOL/image/be11353a02f4b1476ff7565a60acdccf6f4f0dce",
    phone: "+44 555 123 4567",
    website: "https://www.papajohns.co.uk",
  },
  {
    name: "Texas Chicken",
    slogan: "We're the taste of Texas and we can't be mimicked",
    logo: "https://s3-alpha-sig.figma.com/img/e26e/d4b5/7aad490c38228146274cc7257df0bde7?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k8dN2dSJIFyeM8m6Iawdv0beCjAbeocA1LAA5LRo79cbfHsNW1OYu1HCMiptC5P8rtZvD82Dq4ZXIxfoIu0iCPrfOQ8fyrCOS~S7Ko0~Y24TnIZtj8-aFPiKfEzfaIOT5ij887bCOFvFC3rb6ahmJf9wismBzDtPmfdRCUyXpTA~k-Uo~KkU5cybdtuZ9EMYrkl6WCxPM8qsJbyCw~9ToMWBab6-j8kH0QNwvW6wInHDEEtKbdvdbvzb8hKw9~2Bs7ZXgPABv6rJH-9xqeeKr9ZkWAubYHiACEM2lZHIUbau0Dtro603jBSw1eR~KN07~2OLCJdvlHAelAOjXhaI7g__",
    start_time: new Date("2024-11-23T10:30:00Z"),
    end_time: new Date("2024-11-23T23:30:00Z"),
    minimum_order: 8.0,
    delivery_time: 40, // 40 minutes
    address: "321 Texas Chicken Blvd, London",
    latitude: "51.5060",
    longitude: "-0.1300",
    image:
      "https://www.figma.com/file/PwcM13xK4XBCiuX2M1iuOL/image/be11353a02f4b1476ff7565a60acdccf6f4f0dce",
    phone: "+44 777 123 9876",
    website: "https://www.texaschicken.com",
  },
  {
    name: "Burger King",
    slogan: "You Rule",
    logo: "https://s3-alpha-sig.figma.com/img/d2b7/2860/8ed4568af5093e1f34a25e04548d9670?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DvbT5sZOouJKGQs3GasQHSwCrJBMestr700fIIkaOl5U0FaftRQomUmBon34Z9Qv37B4gMkDreHAPF58EwT6U73mbuo-LRKtx0w8P2-yCjiiiHxWhJGbaedTFxrlPTpSrYlM5VMA~-74JLdyJy~6TLnaJB3wwVXdiMFW9XTTnB6mLdJCW1asQn2d4Vi~g4O1GGgSoypT8Ens5890Z8Y01Z-6yfaYgDdJHuNgEDnSPKzLef4XrVko6jhQIc3VJeha99BXgz1olDPh~lDK-1nBcGx6ku2qJ69Z8ijqtkcMJKcoPHhrgOzavqo7ML1PAhuupPro-l2O3KjY4q1z~qFTmw__",
    start_time: new Date("2024-11-23T09:30:00Z"),
    end_time: new Date("2024-11-23T23:30:00Z"),
    minimum_order: 6.5,
    delivery_time: 30, // 30 minutes
    address: "123 Burger King Rd, London",
    latitude: "51.5090",
    longitude: "-0.1234",
    image:
      "https://www.figma.com/file/PwcM13xK4XBCiuX2M1iuOL/image/be11353a02f4b1476ff7565a60acdccf6f4f0dce",
    phone: "+44 999 888 7777",
    website: "https://www.burgerking.co.uk",
  },
  {
    name: "Shaurma 1",
    slogan: "Where Taste and Tradition Meet in Every Shaurma Bite.",
    logo: "https://shaurma.az/wwwroot/assets/images/shaurma1-image.jpg",
    start_time: new Date("2024-11-23T11:00:00Z"),
    end_time: new Date("2024-11-23T22:30:00Z"),
    minimum_order: 4.5,
    delivery_time: 20, // 20 minutes
    address: "555 Shaurma St, London",
    latitude: "51.5100",
    longitude: "-0.1210",
    image:
      "https://www.figma.com/file/PwcM13xK4XBCiuX2M1iuOL/image/be11353a02f4b1476ff7565a60acdccf6f4f0dce",
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
