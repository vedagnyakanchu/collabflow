const express = require("express");
const app = express();

app.use(express.json());

// Routes (routes folder is outside src)
const authRoutes = require("../routes/authRoutes");
const taskRoutes = require("../routes/task");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;