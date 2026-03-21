const express = require("express");
const router = express.Router();
const db = require("../db");

console.log("Profile route loaded");

router.get("/:id", (req, res) => {
  console.log("Profile route hit");

  const id = req.params.id;

  // 🔥 Intentionally vulnerable (SQL Injection)
  db.get(`SELECT id, username, role, notes FROM users WHERE id = ${id}`, (err, row) => {
    if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(row);
  });
});

module.exports = router;