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
        .send({ label: "warning", message: "Email already exists" });
    }
    let status = "Pending";
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

  // console.log("CALLED");
  User.findOne({ email: email, password: password }).then(async (savedUser) => {
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
  });
});

router.post("/updateProfile", async (req, res) => {
  // res.send({ label: "success", message: "Food added successfully..." });
  const { userId, firstName, lastName, mobile } = req.body;

  User.updateOne(
    { _id: userId },
    { $set: { firstName: firstName, lastName: lastName, mobile: mobile } },
    null
  )
    .then((success) => {
      // console.log(savedUser);
      res.send({
        label: "success",
        message: "Your profile updated successfully...",
      });
    })
    .catch((err) => {
      return res.status(422).send({
        label: "warning",
        message: "Opps! Something went wrong !!!",
      });
    });
});

router.post("/updateAddress", async (req, res) => {
  // res.send({ label: "success", message: "Food added successfully..." });
  const { userId, address, latitude, longitude } = req.body;

  User.updateOne(
    { _id: userId },
    { $set: { address: address, latitude: latitude, longitude: longitude } },
    null
  )
    .then((success) => {
      // console.log(savedUser);
      res.send({
        label: "success",
        message: "Your address updated successfully...",
      });
    })
    .catch((err) => {
      return res.status(422).send({
        label: "warning",
        message: "Opps! Something went wrong !!!",
      });
    });
});

router.post("/updatePassword", async (req, res) => {
  // res.send({ label: "success", message: "Food added successfully..." });
  const { userId, oldPassword, newPassword } = req.body;

  User.updateOne(
    { _id: userId, password: oldPassword },
    { $set: { password: newPassword } },
    null
  )
    .then(() => {
      // console.log(savedUser);
      res.send({
        label: "success",
        message: "Your password changed successfully...",
      });
    })
    .catch((err) => {
      return res.status(422).send({
        label: "warning",
        message: err.message,
      });
    });
});

module.exports = router;
