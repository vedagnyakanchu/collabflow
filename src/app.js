const express = require("express");
const cors = require('cors');                   // ✅ ADDED
const connectDB = require('../config/db');      // ✅ ADDED (not used here)
const projectRoutes = require('../routes/project'); // ✅ ADDED
const taskRoutes = require('../routes/task');   // ✅ FIXED import

const app = express();

// ✅ FIXED: Essential middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/tasks", taskRoutes);
app.use("/api/health", require("../routes/healthRoutes"));
app.use("/api/projects", projectRoutes);        // ✅ ADDED

app.get("/", (req, res) => {
  res.json({ message: "CollabFlow API Running 🚀" });
});

module.exports = app;
