// Import necessary modules
const axios = require("axios");

// Define signup function
const signup = async (email, password) => {
  try {
    // Make POST request to signup endpoint
    const response = await axios.post("http://localhost:3000/signup", {
      email: email,
      password: password,
    });

    // Extract and return the user UID
    const { uid } = response.data;
    return uid;
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error signing up:", error.response.data.error);
    return null;
  }
};

// Export signup function
module.exports = signup;
