const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["student", "staff", "hod"], required: true },
    qr_code: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
