const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

// Import routes
const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");

// Mount routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
