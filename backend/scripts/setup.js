const user = require("../models/user");
const bcrypt = require("bcrypt");

async function createAdmin() {
    try {
        const existing = await user.findOne({ email: "admin@gmail.com" });
        if (existing) {
            console.log("Admin already exists");
        } else {
            const newAdmin = new user({
                email: "admin@gmail.com",
                password: await bcrypt.hash("admin123", 10),
                role: "admin"
            });
            await newAdmin.save();
            console.log("Admin created successfully");
        }
    } catch (e) {
        console.error(e.message);
    }
}

module.exports = { createAdmin };