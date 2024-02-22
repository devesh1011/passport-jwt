const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDB,
};
