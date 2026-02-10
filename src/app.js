const express = require("express");
const app = express();

app.use(express.json());

console.log("✅ app.js loaded");

// ROUTES
const authRoutes = require("../routes/authRoutes");
const taskRoutes = require("../routes/task");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// TEST ROUTE
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

module.exports = app;
