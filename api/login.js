// Import necessary modules
const admin = require("firebase-admin");

// Define login function
const login = async (email, password) => {
  try {
    // Sign in the user with Firebase Authentication
    const userCredential = await admin
      .auth()
      .signInWithEmailAndPassword(email, password);

    // Return the UID (User ID) and ID Token of the authenticated user
    const { uid, refreshToken } = userCredential.user;
    const idToken = await userCredential.user.getIdToken();
    return { uid, idToken, refreshToken };
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error logging in:", error.message);
    return null;
  }
};

// Export login function
module.exports = login;
