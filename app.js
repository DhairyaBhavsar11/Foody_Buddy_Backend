var express = require("express");
var mongoose = require("mongoose");
var app = express();
var database = require("./config/database");
var bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

// TO access image from server
const imagePath = path.join(__dirname, "imageStorage");
app.use("/imageStorage", express.static(imagePath));

var port = process.env.PORT || 8081; // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

mongoose.connect(database.url);

//Models
require("./models/restaurant");
require("./models/food");
require("./models/user");
require("./models/order");
// Routes
const auth = require("./routes/restaurantAuth");
const food = require("./routes/manageFood");
const user = require("./routes/manageUser");
const order = require("./routes/manageOrder");
app.use(auth);
app.use(food);
app.use(user);
app.use(order);

app.get("/", function (req, res) {});

app.post("/restaurantSignUp", function (req, res) {
  console.log(req.body);
  res.send("restaurantSignUp API Called");
});

app.post("/login", function (req, res) {
  console.log(req.body);
  res.send("Login API Called");
});

app.post("/addFood", function (req, res) {
  console.log(req.body);
  res.send("addFood API Called");
});

app.post("/getFoods", function (req, res) {
  console.log(req.body);
  res.send("getFoods API Called");
});

app.post("/updateFoodStatus", (req, res) => {
  console.log(req.body);
  res.send("updateFoodStatus API Called");
});

app.post("/userSignUp", function (req, res) {
  console.log(req.body);
  res.send("userSignUp API Called");
});

app.post("/userLogin", function (req, res) {
  console.log(req.body);
  res.send("userLogin API Called");
});

app.post("/getNearByRestaurants", (req, res) => {
  console.log(req.body);
  res.send("getNearByRestaurants API Called");
});

app.post("/checkRestaurantIsRegisteredOrNot", (req, res) => {
  console.log(req.body);
  res.send("checkRestaurantIsRegisteredOrNot API Called");
});

var tempPath = "AB";

function tempPathInit(path) {
  tempPath = path;
  return path;
}
// Image upload
const storage = multer.diskStorage({
  destination: "imageStorage/",
  filename: function (req, file, cb) {
    cb(
      null,
      tempPathInit(
        "FoodImages/Dish-" +
          Date.now() +
          "." +
          file.originalname.split(".").pop()
      )
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      return cb(new Error("Only JPEG and PNG files are allowed"));
    }
    cb(null, true);
  },
});

app.post("/uploadFoodImage", upload.single("file"), (req, res) => {
  // console.log(req.file.filename);
  // console.log(req.file.mimetype);
  res.send({ label: "successImage", filePath: "imageStorage/" + tempPath });
});

app.post("/addOrder", async (req, res) => {
  console.log(req.body);
  res.send("addOrder API Called");
});

app.post("/getOrderHistory", async (req, res) => {
  console.log(req.body);
  res.send("getOrderHistory API Called");
});

app.post("/getRestaurantsOrder", async (req, res) => {
  console.log(req.body);
  res.send("getRestaurantsOrder API Called");
});

app.post("/acceptTheOrder", async (req, res) => {
  console.log(req.body);
  res.send("acceptTheOrder API Called");
});

app.post("/updateProfile", async (req, res) => {
  console.log(req.body);
  res.send("updateProfile API Called");
});

app.post("/updateAddress", async (req, res) => {
  console.log(req.body);
  res.send("updateAddress API Called");
});

app.post("/updatePassword", async (req, res) => {
  console.log(req.body);
  res.send("updatePassword API Called");
});

app.listen(port);
console.log("App listening on port : " + port);
