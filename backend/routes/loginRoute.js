const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "❌ Неправильний email або пароль" });
    }

    if (user.password !== password) {
      return res
        .status(400)
        .json({ message: "❌ Неправильний email або пароль" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });

    res.status(200).json({
      message: "✅ Успішний вхід",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Ошибка серверу", error });
  }
});

module.exports = router;
