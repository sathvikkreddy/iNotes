const mongoose = require("mongoose");

const connectionURI =
  "mongodb+srv://sathvikkreddy:sathvik8685@cluster0.w8wptwz.mongodb.net/i-notess";

const connectToDb = () => {
  mongoose
    .connect(connectionURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err.message);
    });
};

module.exports = connectToDb;
