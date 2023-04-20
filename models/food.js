const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const foodSchema = new Schema({
  foodName: String,
  foodDescription: String,
  foodPrice: String,
  foodCategory: String,
  imagePath: String,
  restaurantId: String,
  status: String,
});

module.exports = mongoose.model("Food", foodSchema);

// foodName,
// foodDescription,
// foodPrice,
// foodCategory,
// imagePath,
// restaurantId,
// status,
