const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_Uri = process.env.MONGO_URL;

const initializationDatabase = async () => {
  await mongoose
    .connect(MONGO_Uri)
    .then(() => console.log("Connect Database Successfully"))
    .catch((error) => console.log("Failed to connect Database"));
};

module.exports = { initializationDatabase }