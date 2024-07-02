const mongoose = require("../config/db");

const userSchema = new mongoose.Schema ({
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" }
})

module.exports = mongoose.model("user", userSchema);