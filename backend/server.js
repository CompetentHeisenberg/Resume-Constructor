const express = require("express");
const cors = require("cors");
const mongoose = require("./db");
const bodyParser = require("body-parser");

// Импорт маршрутов
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoute");
const templatesRoute = require("./routes/templates");

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Маршруты
app.use("/templates", templatesRoute);
app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
