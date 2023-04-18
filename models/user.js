const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  mobile: String,
  imgUrl: String,
  address: String,
  latitude: String,
  longitude: String,
});

module.exports = mongoose.model("User", userSchema);
