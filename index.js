// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const login = require("./api/login");
const signup = require("./api/signup");

// Load the service account key JSON file
const serviceAccount = require("/json/foodybuddy-8547f-firebase-adminsdk-ak7o7-8d885db24c.json");

// Initialize Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
