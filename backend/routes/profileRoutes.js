const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// Получити профиль юзера (треба аби користувач зайшов)
router.get("/", auth, async (req, res) => {
  try {
    // req.user встановлюється middleware auth післе перевірки токена
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.getProfile());
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Обновити профиль юзера (треба аутентификация)
router.put("/", auth, async (req, res) => {
  try {
    const { fullName, phone, position, company } = req.body;

    const updates = {};
    if (fullName !== undefined) updates.fullName = fullName;
    if (phone !== undefined) updates.phone = phone;
    if (position !== undefined) updates.position = position;
    if (company !== undefined) updates.company = company;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.getProfile());
  } catch (err) {
    console.error("Error updating profile:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
