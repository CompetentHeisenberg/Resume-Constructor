const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
