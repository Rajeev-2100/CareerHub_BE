const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_Uri = process.env.MONGO_URL;

const initializationDatabase = async () => {
  try {
    await mongoose.connect(MONGO_Uri);
    console.log("Connect Database Successfully");
  } catch (error) {
    console.error("Failed to connect Database:", error);
    // Throwing error so that if it fails, we know about it instead of silently buffering requests forever
    throw error;
  }
};

module.exports = { initializationDatabase };