const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET /api/tasks
// @desc    Get all tasks (with optional filter)
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const filter = { user: req.user.id };

    // If status query is present
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

module.exports = router;
