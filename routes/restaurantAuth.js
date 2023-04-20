const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");

router.post("/restaurantSignUp", (req, res) => {
  const {
    restaurantName,
    email,
    password,
    confirmPassword,
    mobile,
    openHours,
    addressLineOne,
    addressLineTwo,
    latitude,
    longitude,
  } = req.body;
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
      openHours,
      addressLineOne,
      addressLineTwo,
      latitude,
      longitude,
    });
    try {
      await restaurant.save();
      res.send({ label: "success", message: "You're registered successfully" });
    } catch (err) {
      return res.status(422).send({ label: "warning", message: err.message });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("CALLED");
  Restaurant.findOne({ email: email, password: password }).then(
    async (savedRestaurant) => {
      try {
        if (savedRestaurant) {
          res.send(savedRestaurant);
        } else {
          return res
            .status(422)
            .send({ label: "Opps!", message: "Invalid credentials !!" });
        }
      } catch (err) {
        return res.status(422).send({ label: "Opps!", message: err.message });
      }
    }
  );
});

router.post("/checkRestaurantIsRegisteredOrNot", (req, res) => {
  const { restaurantId } = req.body;
  //   var userName = helper.generateUsername(email);
  Restaurant.findOne({ _id: restaurantId }).then(async (savedRestaurant) => {
    // console.log(savedUser);
    if (savedRestaurant) {
      return res.send({
        label: "success",
      });
    } else {
      return res.status(422).send({ label: "warning" });
    }
  });
});

module.exports = router;
