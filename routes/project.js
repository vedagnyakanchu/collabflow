const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware"); // ✅ Use only this middleware

// ==============================
// CREATE a new project
// ==============================
router.post("/", auth, async (req, res) => {
  try {
    const { name, description, teamMembers } = req.body;

    const project = new Project({
      name,
      description,
      createdBy: req.user.id, // comes from JWT
      teamMembers,
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ==============================
// GET all projects for logged-in user
// ==============================
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { teamMembers: req.user.id },
      ],
    }).sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
