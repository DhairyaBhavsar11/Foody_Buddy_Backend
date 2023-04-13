// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

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
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sign in the user with Firebase Authentication
    const userCredential = await admin
      .auth()
      .signInWithEmailAndPassword(email, password);

    // Return the UID (User ID) and ID Token of the authenticated user
    const { uid, refreshToken } = userCredential.user;
    const idToken = await userCredential.user.getIdToken();
    res.json({ uid, idToken, refreshToken });
  } catch (error) {
    // Handle any errors that may occur
    res.status(401).json({ error: error.message });
  }
});

// Define signup endpoint
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // Return the UID (User ID) of the newly created user
    res.json({ uid: userRecord.uid });
  } catch (error) {
    // Handle any errors that may occur
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
