const express = require("express");
const { authenticateToken } = require("../utils/authMiddleware");
const { getUserById } = require("../controller/authenticated");

const router = express.Router();

router.get("/user", authenticateToken, getUserById);

module.exports = router;