// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const mongoose = require("mongoose");
const login = require("./api/login");
const signup = require("./api/signup");
const {
  getRestaurantsByLocation,
  addRestaurant,
  addMenuItemToRestaurant,
  getMenuItemsByRestaurantId,
} = require("./api/restaurant");

// Load the service account key JSON file
const serviceAccount = require("./json/foodybuddy-8547f-firebase-adminsdk-ak7o7-8d885db24c.json");

// Initialize Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://FoodyBuddies:foody_buddies@foodybuddies.mmzoz5c.mongodb.net/FoodyBuddies",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Create Express app
const app = express();
app.use(bodyParser.json());

// Define login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call the login function from api/login.js
    const user = await login(email, password);

    // If login is successful, return the user data
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    // Handle any errors that may occur
    res.status(500).json({ error: error.message });
  }
});

// Define signup endpoint
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call the signup function from api/signup.js
    const user = await signup(email, password);

    // If signup is successful, return the user data
    if (user) {
      res.json(user);
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  } catch (error) {
    // Handle any errors that may occur
    res.status(500).json({ error: error.message });
  }
});

// Define restaurants endpoint for location-based search
app.get("/restaurants", async (req, res) => {
  const { longitude, latitude, maxDistance } = req.query;

  try {
    // Call the getRestaurantsByLocation function from api/restaurant.js
    const restaurants = await getRestaurantsByLocation(
      longitude,
      latitude,
      maxDistance
    );

    // If restaurants are found, return the restaurant data
    if (restaurants) {
      res.json(restaurants);
    } else {
      res.status(500).json({ error: "Failed to get restaurants by location" });
    }
  } catch (error) {
    // Handle any errors that may occur
    res.status(500).json({ error: error.message });
  }
});

// Define add restaurant endpoint
app.post("/api/restaurants", async (req, res) => {
  const { name, address, city, state, zip, longitude, latitude } = req.body;
  const restaurant = await addRestaurant(
    name,
    address,
    city,
    state,
    zip,
    longitude,
    latitude
  );
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(500).json({ error: "Failed to add restaurant" });
  }
});

// Define add menu item endpoint
app.post("/api/restaurants/:restaurantId/menu", async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const { name, description, image } = req.body;
  const restaurant = await addMenuItemToRestaurant(
    restaurantId,
    name,
    description,
    image
  );
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(500).json({ error: "Failed to add menu item to restaurant" });
  }
});

// Define get menu items endpoint
app.get("/api/restaurants/:restaurantId/menu", async (req, res) => {
  const restaurantId = req.params.restaurantId;

  try {
    // Call the getMenuItemsByRestaurantId function from api/restaurant.js
    const menuItems = await getMenuItemsByRestaurantId(restaurantId);
    // If menu items are found, return the menu item data
    if (menuItems) {
      res.json(menuItems);
    } else {
      res
        .status(500)
        .json({ error: "Failed to get menu items for restaurant" });
    }
  } catch (error) {
    // Handle any errors that may occur
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
