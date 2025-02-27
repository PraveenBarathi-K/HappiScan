const express = require("express");
const User = require("../models/User");
const Wish = require("../models/Wish");

const router = express.Router();

// Get Top 10 Wishers for Leaderboard (Summing Points Given)
router.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await Wish.aggregate([
            {
                $group: {
                    _id: "$from_user", // Grouping by wisher
                    total_points: { $sum: "$points_awarded" } // Summing all points they have given
                }
            },
            {
                $lookup: {
                    from: "users", // Matching users collection
                    localField: "_id",
                    foreignField: "user_id",
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" }, // Extract user details
            { $sort: { total_points: -1 } }, // Sort by highest points given
            { $limit: 10 }, // Get top 10 wishers
            {
                $project: {
                    _id: 0,
                    user_id: "$_id",
                    name: "$userDetails.name",
                    total_points: 1
                }
            }
        ]);

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leaderboard", error: error.message });
    }
});

module.exports = router;
