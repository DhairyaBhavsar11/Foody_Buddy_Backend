// Import necessary modules
const axios = require("axios");

// Define login function
const login = async (email, password) => {
  try {
    // Make POST request to login endpoint
    const response = await axios.post("http://localhost:3000/login", {
      email: email,
      password: password,
    });

    // Extract and return the user data
    const { uid, idToken, refreshToken } = response.data;
    return { uid, idToken, refreshToken };
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error logging in:", error.response.data.error);
    return null;
  }
};

// Export login function
module.exports = login;
