const bcrypt = require("bcrypt");
const user = require("../models/user");
const { generateToken, verifyToken, generateRefreshToken } = require("../utils/auth");

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const userExists = await user.findOne({ email });
        if (!userExists) {
            throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        const token = generateToken(userExists);
        res.status(200).json({ user: userExists, token: token });
    } catch (e) {
        res.status(401).json({ message: "Invalid credentials" });
    }
}

async function refreshToken(req, res) {
    try {
        const { oldToken } = req.body;
        const decodedToken = verifyToken(oldToken);
        const userExists = user.findById(decodedToken.id);
        if (!userExists) {
            throw new Error("User not found");
        }

        const newToken = generateRefreshToken(userExists);
        res.status(200).json({ token: newToken });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Failed to refresh token" });
    }
}

module.exports = { loginUser, refreshToken };