const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const orderSchema = new Schema({
  foodName: String,
  foodId: String,
  foodPrice: String,
  imagePath: String,
  Notes: String,
  quantity: String,
  restaurantId: String,
  userId: String,
  driverId: String,
  status: String,
});

module.exports = mongoose.model("Order", orderSchema);

// foodName,
// foodId,
// foodPrice,
// imagePath,
// Notes,
// quantity,
// restaurantId,
// status,
// userId,
// driverId,
