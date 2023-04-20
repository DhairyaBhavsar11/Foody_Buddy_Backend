const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = mongoose.model("Order");

router.post("/addOrder", async (req, res) => {
  // res.send({ label: "success", message: "Food added successfully..." });
  const {
    foodName,
    foodId,
    foodPrice,
    imagePath,
    Notes,
    quantity,
    restaurantId,
    userId,
    driverId,
  } = req.body;
  //   var userName = helper.generateUsername(email);

  let status = "-1";
  const order = new Order({
    foodName,
    foodId,
    foodPrice,
    imagePath,
    Notes,
    quantity,
    restaurantId,
    userId,
    driverId,
    status,
  });
  try {
    await order.save();
    res.send({ label: "success", message: "Your order placed successfully.." });
  } catch (err) {
    return res
      .status(422)
      .send({ label: "Opps!", message: "Something went wrong !!" });
  }
});

router.post("/getOrderHistory", async (req, res) => {
  // res.send({ label: "success", message: "Food added successfully..." });
  const { userId } = req.body;

  Order.find({ userId: userId }).then(async (savedOrders) => {
    // console.log(savedUser);
    if (savedOrders) {
      res.send(savedOrders);
    } else {
      return res.status(422).send({
        label: "warning",
        message: "Opps! There's no oreder placed !!!",
      });
    }
  });
});

router.post("/getRestaurantsOrder", async (req, res) => {
  // res.send({ label: "success", message: "Food added successfully..." });
  const { restaurantId } = req.body;

  Order.find({ restaurantId: restaurantId }).then(async (savedOrders) => {
    // console.log(savedUser);
    if (savedOrders) {
      res.send(savedOrders);
    } else {
      return res.status(422).send({
        label: "warning",
        message: "Opps! There's no oreder placed !!!",
      });
    }
  });
});

router.post("/acceptTheOrder", async (req, res) => {
  // res.send({ label: "success", message: "Food added successfully..." });
  const { orderId } = req.body;

  Order.updateOne({ _id: orderId }, { $set: { status: "0" } }, null)
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
