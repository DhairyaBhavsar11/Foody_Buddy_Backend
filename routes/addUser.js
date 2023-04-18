const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.post("/userSignUp", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    mobile,
    imgUrl,
    address,
    latitude,
    longitude,
  } = req.body;
  //   var userName = helper.generateUsername(email);
  User.findOne({ email: email }).then(async (savedUser) => {
    // console.log(savedUser);
    if (savedUser) {
      return res
        .status(422)
        .send({ label: "warning", message: "User already exists" });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      mobile,
      imgUrl,
      address,
      latitude,
      longitude,
    });
    try {
      await user.save();
      res.send({ label: "success", message: "You're registered successfully" });
    } catch (err) {
      return res.status(422).send({ label: "warning", message: err.message });
    }
  });
});

router.post("/userLogin", (req, res) => {
  const { email, password } = req.body;

  console.log("CALLED");
  Restaurant.findOne({ email: email, password: password }).then(
    async (savedUser) => {
      try {
        if (savedUser) {
          res.send(savedUser);
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

module.exports = router;
