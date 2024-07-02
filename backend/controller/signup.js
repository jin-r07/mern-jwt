const User = require("../models/user");
const bcrypt = require("bcrypt");

async function signupUser(req, res) {
    try {
        const { email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashPassword,
            role: "user"
        });
        const saveUser = await newUser.save();
        res.status(201).json({ message: "User created successfully.", user: saveUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { signupUser };