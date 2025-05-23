const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: String,
    htmlContent: String,
    category: String,
    thumbnail: String,
    placeholders: {
      type: [String],
      default: [
        "fullName",
        "email",
        "phone",
        "position",
        "experience",
        "education",
        "projects",
        "languages",
        "skills",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);
