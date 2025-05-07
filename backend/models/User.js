const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: [6, "Password must be at least 6 characters"],
    },
    avatar: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          return (
            v === "" ||
            v.startsWith("data:image") ||
            /^data:image\/(jpeg|png|gif|jpg);base64,/.test(v)
          );
        },
        message: (props) => `Invalid avatar format!`,
      },
    },
    fullName: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
      match: [
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
        "Invalid phone number",
      ],
    },
    position: {
      type: String,
      trim: true,
      default: "",
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Метод для того аби ми зберегли паролі
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Метод для генерації нашого токену шо потім будемо використовувати
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Метод для получения всієї інформації про профіль
UserSchema.methods.getProfile = function () {
  return {
    id: this._id,
    email: this.email,
    fullName: this.fullName,
    phone: this.phone,
    position: this.position,
    company: this.company,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    avatar: this.avatar,
  };
};

module.exports = mongoose.model("User", UserSchema);
