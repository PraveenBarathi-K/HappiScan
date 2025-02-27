const mongoose = require("mongoose");

const WishSchema = new mongoose.Schema({
    from_user: { type: String, required: true },
    to_user: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    points_awarded: { type: Number, required: true }
});

module.exports = mongoose.model("Wish", WishSchema);
