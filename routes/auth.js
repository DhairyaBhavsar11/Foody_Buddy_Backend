const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");

router.post("/restaurantSignUp", (req, res) => {
  const {
    restaurantName,
    description,
    email,
    password,
    confirmPassword,
    mobile,
    openHours,
    addressLineOne,
    addressLineTwo,
    addressLineThree,
    latitude,
    longitude,
  } = req.body;
  //   var userName = helper.generateUsername(email);
  Restaurant.findOne({ email: email }).then(async (savedRestaurant) => {
    // console.log(savedUser);
    if (savedRestaurant) {
      return res
        .status(422)
        .send({ label: "Opps!", message: "Restaurant already exists" });
    }
    let status = "Closed";
    const restaurant = new Restaurant({
      restaurantName,
      description,
      email,
      password,
      mobile,
      openHours,
      addressLineOne,
      addressLineTwo,
      addressLineThree,
      latitude,
      longitude,
      status,
    });
    try {
      await restaurant.save();
      res.send({ label: "Success", message: "You're registered successfully" });
    } catch (err) {
      return res.status(422).send({ label: "Opps!", message: err.message });
    }
  });
});

module.exports = router;
