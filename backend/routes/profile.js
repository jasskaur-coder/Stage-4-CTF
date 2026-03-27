const express = require("express");
const router = express.Router();
const db = require("../db");

console.log("Profile route loaded");

// 🔥 EXISTING VULNERABLE ROUTE (SQLi + IDOR)
router.get("/:id", (req, res) => {
  console.log("Profile route hit");

  const id = req.params.id;

  db.get(
    'SELECT id, username, role, notes FROM users WHERE id = ${id}',
    (err, row) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json({ error: err.message });
      }

      if (!row) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(row);
    }
  );
});

// 🔥 MASS ASSIGNMENT VULNERABILITY (INTENDED)
router.put("/", (req, res) => {
  const { username, role } = req.body;

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // ⚠️ VULNERABLE: blindly trusting user input
  const updatedUser = {
    username: username,
    role: role
  };

  return res.json({
    message: "Profile updated",
    user: updatedUser
  });
});

module.exports = router;