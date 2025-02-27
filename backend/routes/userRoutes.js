const express = require("express");
const QRCode = require("qrcode");
const User = require("../models/User");

const router = express.Router();

// Predefined passwords for staff and HOD (In production, use hashed passwords & a database)
const ADMIN_PASSWORDS = {
    staff: "staff123",
    hod: "hod123"
};

// Generate and store QR Code for a user
router.post("/generate_qr", async (req, res) => {
    try {
        const { user_id, name, role, password } = req.body;

        // Validate required fields
        if (!user_id || !name || !role) {
            return res.status(400).json({ message: "All fields are required (user_id, name, role)" });
        }

        // If role is not student, check password
        if (role !== "student") {
            if (!password || password !== ADMIN_PASSWORDS[role]) {
                return res.status(401).json({ message: "Invalid password for role: " + role });
            }
        }

        // Check if user already exists
        let user = await User.findOne({ user_id });

        if (user) {
            return res.status(200).json({ message: "User already exists", qr_code: user.qr_code });
        }

        // Generate QR code data
        const qrData = JSON.stringify({ user_id, name, role, timestamp: Date.now() });
        const qrCode = await QRCode.toDataURL(qrData);

        // Create and save new user
        user = new User({ user_id, name, role, qr_code: qrCode });
        await user.save();

        res.status(201).json({ message: "User created", qr_code: qrCode });
    } catch (error) {
        res.status(500).json({ message: "Error generating QR", error: error.message });
    }
});

module.exports = router;
