const express = require("express");
const cors = require("cors");

require("./db");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const adminRoutes = require("./routes/admin");
const internalRoutes = require("./routes/internal");
const uploadRoutes = require("./routes/upload");
const renderRoutes = require("./routes/render");

const app = express();

app.use(cors());
app.use(express.json());
console.log("Registering profile routes");
app.use("/api", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/internal", internalRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/render", renderRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});