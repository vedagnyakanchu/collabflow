const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

// ❌ PROBLEM: export missing here

router.post("/login", login);

module.exports = router;
