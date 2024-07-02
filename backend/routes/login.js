const express = require("express");
const { loginUser, refreshToken } = require("../controller/login");

const router = express.Router();

router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

module.exports = router;