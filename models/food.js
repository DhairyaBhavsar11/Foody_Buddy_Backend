const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const foodSchema = new Schema({
  foodName: String,
  foodDescription: String,
  foodPrice: Number,
  foodCategory: String,
  restaurantId: String,
  status: String,
});

module.exports = mongoose.model("Food", foodSchema);
