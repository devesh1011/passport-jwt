const express = require("express");
const { connectDB } = require("./utils/db");
const passport = require("passport");
const { User } = require("./models/User");
require("./config/passport");
require("dotenv").config();
const userRoutes = require("./routes/users.js");

const app = express();

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello@");
});

app.listen(3000, () => {
  connectDB();

  console.log("Server is connected to port 3000");
});
