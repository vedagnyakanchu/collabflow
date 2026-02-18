const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// =======================================
// GET /api/tasks
// Get all tasks for logged-in user
// =======================================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const filter = { createdBy: req.user.id };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// =======================================
// POST /api/tasks
// Create a new task
// =======================================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const newTask = new Task({
      title: title.trim(),
      description: description || "",
      status: "todo",
      createdBy: req.user.id,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// =======================================
// PATCH /api/tasks/:id/status
// Update only task status
// =======================================
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["todo", "in-progress", "done"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.status = status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// =======================================
// PATCH /api/tasks/:id
// Update task title & description
// =======================================
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({ msg: "Title cannot be empty" });
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description;
    }

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// =======================================
// DELETE /api/tasks/:id
// Delete a task
// =======================================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
