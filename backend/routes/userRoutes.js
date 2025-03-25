const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "❌ Email уже зарегестрований" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: "✅ Пользователь зареєстрований",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Помилка сервера", error });
  }
});

module.exports = router;
