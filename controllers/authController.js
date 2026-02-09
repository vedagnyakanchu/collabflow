const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // TEMP: no DB yet
    return res.status(201).json({
      message: "User registered successfully",
      email,
      hashedPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  res.json({ message: "Login route working" });
};

module.exports = {
  register,
  login,
};
