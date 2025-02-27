const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Fetch QR Code for an existing user
router.get("/fetch_qr/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;

        // Find the user by user_id
        const user = await User.findOne({ user_id });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "QR Code fetched successfully", qr_code: user.qr_code });
    } catch (error) {
        res.status(500).json({ message: "Error fetching QR", error: error.message });
    }
});

module.exports = router;
