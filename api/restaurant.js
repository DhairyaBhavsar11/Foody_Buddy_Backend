// Import necessary modules
const mongoose = require("mongoose");

// Define the menu item schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

// Define the restaurant schema
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
  menu: [menuItemSchema], // Array of menu items
});

// Create restaurant model
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Define function to get restaurants based on location
const getRestaurantsByLocation = async (
  longitude,
  latitude,
  maxDistance = 5000
) => {
  try {
    // Convert the longitude and latitude to numbers
    const lon = parseFloat(longitude);
    const lat = parseFloat(latitude);

    // Query for restaurants within the specified distance
    const restaurants = await Restaurant.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [lon, lat],
          },
          $maxDistance: maxDistance,
        },
      },
    });

    return restaurants;
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error getting restaurants by location:", error.message);
    return null;
  }
};

// Define function to add a restaurant
const addRestaurant = async (
  name,
  address,
  city,
  state,
  zip,
  longitude,
  latitude
) => {
  try {
    // Create a new restaurant document
    const restaurant = new Restaurant({
      name: name,
      address: address,
      city: city,
      state: state,
      zip: zip,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    });

    // Save the restaurant to the database
    const savedRestaurant = await restaurant.save();

    return savedRestaurant;
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error adding restaurant:", error.message);
    return null;
  }
};

// Define function to add a menu item to a restaurant
const addMenuItemToRestaurant = async (
  restaurantId,
  name,
  description,
  image
) => {
  try {
    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Create a new menu item
    const menuItem = {
      name: name,
      description: description,
      image: image,
    };

    // Add the menu item to the restaurant's menu
    restaurant.menu.push(menuItem);

    // Save the restaurant to the database
    const savedRestaurant = await restaurant.save();

    return savedRestaurant;
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error adding menu item to restaurant:", error.message);
    return null;
  }
};

// Define function to get menu items for a restaurant
const getMenuItemsByRestaurantId = async (restaurantId) => {
  try {
    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Retrieve the menu items from the restaurant's menu
    const menuItems = restaurant.menu;

    return menuItems;
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error getting menu items for restaurant:", error.message);
    return null;
  }
};

module.exports = {
  getRestaurantsByLocation,
  addRestaurant,
  addMenuItemToRestaurant,
  getMenuItemsByRestaurantId,
};
