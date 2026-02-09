const express = require("express");

const app = express();
app.use(express.json());

// routes
const healthRoutes = require("../routes/healthRoutes");
const authRoutes = require("../routes/authRoutes");

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
