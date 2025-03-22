const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Добавляємо CORS

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); // Можна запроси з інших портів

mongoose.connect("mongodb://127.0.0.1:27017/testing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Добавив поле пароля
});

const User = mongoose.model("User", userSchema);

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Провіряємо чи нема користувачів з таким же емейл
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "❌ Email уже зарегистрирован" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "✅ Пользователь зарегистрирован", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "❌ Ошибка сервера", error });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
