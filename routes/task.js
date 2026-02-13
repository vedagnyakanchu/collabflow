const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");


// =======================================
// @route   GET /api/tasks
// @desc    Get all tasks (with optional filter)
// @access  Private
// =======================================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const filter = { user: req.user.id };

    // Optional status filter
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
// @route   POST /api/tasks
// @desc    Create a task
// @access  Private
// =======================================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTask = new Task({
      title,
      description,
      status,
      user: req.user.id
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// =======================================
// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
// =======================================
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// =======================================
// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
// =======================================
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// =======================================
// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
// =======================================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;
