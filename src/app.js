const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/tasks", require("../routes/task")); // make sure taskRoutes exists
app.use("/api/health", require("../routes/healthRoutes"));
app.use("/api/projects", require("../routes/project"));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "CollabFlow API Running 🚀" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
// Must be after all routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});