const express = require("express");
const app = express();

app.use(express.json());

console.log("✅ app.js loaded");

// ✅ CORRECT PATH (GO UP ONE LEVEL)
const authRoutes = require("../routes/authRoutes");

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

module.exports = app;
