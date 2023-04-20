const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Food = mongoose.model("Food");

router.post("/addFood", (req, res) => {
  // res.send({ label: "success", message: "Food added successfully..." });
  const {
    foodName,
    foodDescription,
    foodPrice,
    foodCategory,
    imagePath,
    restaurantId,
  } = req.body;
  //   var userName = helper.generateUsername(email);
  Food.findOne({ foodName: foodName, restaurantId: restaurantId }).then(
    async (savedRestaurant) => {
      // console.log(savedUser);
      if (savedRestaurant) {
        return res.status(422).send({
          label: "warning",
          message: "Opps! Food is already registred !!!",
        });
      }
      let status = "0";
      const food = new Food({
        foodName,
        foodDescription,
        foodPrice,
        foodCategory,
        imagePath,
        restaurantId,
        status,
      });
      try {
        await food.save();
        res.send({ label: "success", message: "Food registered successfully" });
      } catch (err) {
        return res.status(422).send({ label: "warning", message: err.message });
      }
    }
  );
});

router.post("/getFoods", (req, res) => {
  const { restaurantId } = req.body;
  Food.find({ restaurantId: restaurantId }).then(async (savedRestaurants) => {
    // console.log(savedUser);
    if (savedRestaurants) {
      res.send(savedRestaurants);
    } else {
      return res.status(422).send({
        label: "warning",
        message: "Opps! There's no food registered !!!",
      });
    }
  });
});

router.post("/updateFoodStatus", (req, res) => {
  console.log("HELLo");
  const { foodId, status } = req.body;

  console.log(foodId);
  Food.updateOne(
    { _id: foodId },
    { $set: { status: status == "0" ? "1" : "0" } },
    null
  )
    .then((success) => {
      // console.log(savedUser);
      res.send({
        label: "success",
        message: "Food status changed successfully...",
      });
    })
    .catch((err) => {
      return res.status(422).send({
        label: "warning",
        message: "Opps! Something went wrong !!!",
      });
    });
});

module.exports = router;
