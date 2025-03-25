const express = require("express");
const cors = require("cors");
const mongoose = require("./db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
