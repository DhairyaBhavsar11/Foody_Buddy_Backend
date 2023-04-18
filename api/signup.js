// Import necessary modules
const admin = require("firebase-admin");

// Define signup function
const signup = async (
  email,
  password,
  firstname,
  lastname,
  confirmpassword,
  phoneNumber,
  latitude,
  longitude,
  imageUrl
) => {
  try {
    // Check if password and confirm password match
    if (password !== confirmpassword) {
      throw new Error("Password and confirm password do not match");
    }

    // Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: `${firstname} ${lastname}`,
      phoneNumber: phoneNumber,
    });

    // Return the UID (User ID) of the newly created user
    return { uid: userRecord.uid };
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error signing up:", error.message);
    return null;
  }
};

// Export signup function
module.exports = signup;
