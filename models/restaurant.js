const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  restaurantName: String,
  description: String,
  email: String,
  password: String,
  mobile: String,
  openHours: String,
  addressLineOne: String,
  addressLineTwo: String,
  addressLineThree: String,
  latitude: String,
  longitude: String,
  status: String,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
