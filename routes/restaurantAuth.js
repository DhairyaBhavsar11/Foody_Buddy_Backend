const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");

router.post("/restaurantSignUp", (req, res) => {
  const { restaurantName, email, password, confirmPassword, mobile } = req.body;
  //   var userName = helper.generateUsername(email);
  Restaurant.findOne({ email: email }).then(async (savedRestaurant) => {
    // console.log(savedUser);
    if (savedRestaurant) {
      return res
        .status(422)
        .send({ label: "warning", message: "Restaurant already exists" });
    }
    let status = "Pending";
    const restaurant = new Restaurant({
      restaurantName,
      email,
      password,
      mobile,
      status,
    });
    try {
      await restaurant.save();
      res.send({ label: "success", message: "You're registered successfully" });
    } catch (err) {
      return res.status(422).send({ label: "warning", message: err.message });
    }
  });
});

module.exports = router;
