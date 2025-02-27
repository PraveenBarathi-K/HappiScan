const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routes/UserRoutes.js"));
app.use("/api/wishes", require("./routes/wishRoutes"));
app.use("/api/leader", require("./routes/leaderboard"));
app.use("/api/users", require("./routes/users"));

app.listen(5000, () => console.log("Server running on port 5000"));
