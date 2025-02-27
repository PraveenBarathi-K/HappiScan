const express = require("express");
const Wish = require("../models/Wish");
const User = require("../models/User");
const moment = require("moment");

const router = express.Router();

// Process wish by scanning QR
router.post("/scan_qr", async (req, res) => {
    const { from_user, to_user } = req.body;

    if (from_user === to_user) return res.status(400).json({ message: "You cannot wish yourself!" });

    const lastWish = await Wish.findOne({ from_user }).sort({ timestamp: -1 });
    if (lastWish && moment().diff(moment(lastWish.timestamp), 'hours') < 1) {
        return res.status(400).json({ message: "You can wish only once per hour!" });
    }

    const recipient = await User.findOne({ user_id: to_user });
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    const points = recipient.role === "student" ? 1 : recipient.role === "staff" ? 3 : 5;

    await Wish.create({ from_user, to_user, points_awarded: points });

    res.json({ message: "Wish recorded!", points_awarded: points });
});

module.exports = router;
