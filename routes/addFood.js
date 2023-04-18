const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Food = mongoose.model("Food");

router.post("/addFood", (req, res) => {
  console.log("CAME");
  const {
    foodName: foodName,
    foodDescription: foodDescription,
    foodPrice: foodPrice,
    foodCategory: foodCategory,
    restaurantId: restaurantId,
  } = req.body;

  Food.findOne({ foodName: foodName }).then(async (savedFood) => {
    // console.log(savedUser);
    if (savedFood) {
      return res
        .status(422)
        .send({ label: "warning", message: "Food already exists" });
    }
    let status = "Pending";
    const food = new Food({
      foodName,
      foodDescription,
      foodPrice,
      foodCategory,
      restaurantId,
      status,
    });
    try {
      await food.save();
      res.send({ label: "success", message: "Food added successfully" });
    } catch (err) {
      return res.status(422).send({ label: "warning", message: err.message });
    }
  });
});

module.exports = router;
