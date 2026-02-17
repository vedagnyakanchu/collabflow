const express = require("express");
const cors = require("cors");

const projectRoutes = require("../routes/project");
const taskRoutes = require("../routes/task");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/tasks", taskRoutes);
app.use("/api/health", require("../routes/healthRoutes"));
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.json({ message: "CollabFlow API Running 🚀" });
});

module.exports = app;
