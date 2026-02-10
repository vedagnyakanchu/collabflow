const express = require("express");
const app = express();

// Middleware
app.use(express.json()); // to parse JSON requests

// Import routes
const projectRoutes = require("./routes/project");
// If you have other routes later:
// const userRoutes = require("./routes/user");
// const taskRoutes = require("./routes/task");

// Test routes
app.get("/", (req, res) => {
  res.send("🔥 CollabFlow Server Running 🔥");
});

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

// Use routes
app.use("/api/projects", projectRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/tasks", taskRoutes);

module.exports = app;
