const express = require("express");
const cors = require("cors");

require("./db");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const adminRoutes = require("./routes/admin");
const internalRoutes = require("./routes/internal");

const app = express();

app.use(cors());
app.use(express.json());
console.log("Registering profile routes");
app.use("/api", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/internal", internalRoutes);
// 🔓 IDOR Vulnerability

app.listen(5000, () => {
  console.log("Stage 4 Backend running on port 5000");
});