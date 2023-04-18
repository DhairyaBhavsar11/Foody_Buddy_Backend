var express = require("express");
var mongoose = require("mongoose");
var app = express();
var database = require("./config/database");
var bodyParser = require("body-parser");

var port = process.env.PORT || 8081; // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

mongoose.connect(database.url);
require("./models/restaurant");
const auth = require("./routes/auth");
app.use(auth);

app.get("/", function (req, res) {});

app.post("/restaurantSignUp", function (req, res) {
  console.log(req.body);
  res.send("restaurantSignUp API Called");
});

app.listen(port);
console.log("App listening on port : " + port);
