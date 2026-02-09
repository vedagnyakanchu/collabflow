const express = require("express");
const app = express();

app.use(express.json());

// Log to confirm server runs
console.log("🔥 THIS SERVER.JS IS DEFINITELY RUNNING 🔥");

// Import routes
const healthRoutes = require("../routes/healthRoutes");
const authRoutes = require("../routes/authRoutes");

// Mount routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

// Optional test route
app.get("/test", (req, res) => {
  res.send("GET working");
});

app.listen(5050, () => {
  console.log("✅ Server running on port 5050");
});
