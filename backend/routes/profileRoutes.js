const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -tokens");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/", auth, upload.single("avatar"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.fullName) user.fullName = req.body.fullName;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.position) user.position = req.body.position;
    if (req.body.company) user.company = req.body.company;
    if (req.body.experience) user.experience = req.body.experience;
    if (req.body.education) user.education = req.body.education;
    if (req.body.projects) user.projects = req.body.projects;
    if (req.body.skills) user.skills = req.body.skills;
    if (req.body.languages) user.languages = req.body.languages;

    if (req.file) {
      user.avatar = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
    } else if (req.body.removeAvatar === "true") {
      user.avatar = "";
    }

    await user.save();

    res.json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      position: user.position,
      company: user.company,
      experience: user.experience,
      education: user.education,
      projects: user.projects,
      skills: user.skills,
      languages: user.languages,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || "Server error" });
  }
});

module.exports = router;
