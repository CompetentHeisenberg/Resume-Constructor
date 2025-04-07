require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./db");

// Імпорт маршрутов
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoute");
const templatesRoute = require("./routes/templates");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
const port = process.env.PORT || 3001;

// Настройка CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршрути
app.use("/templates", templatesRoute);
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/profile", profileRoutes);

// Перевірка работи сервера
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date(),
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Якщо 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Not Found",
  });
});

// Обробник ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
    message: err.message,
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `CORS configured for: ${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }`
  );
});
