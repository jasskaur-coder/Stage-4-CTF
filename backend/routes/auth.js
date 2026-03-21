const express = require("express");
const router = express.Router();
const db = require("../db");

const SECRET = "investigation2026"; // Weak secret

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE username='${username}' AND password='${password}'`,
    (err, user) => {
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      // 🔥 Weak token format
      const token = Buffer.from(
        `${user.username}:${user.role}:${SECRET}`
      ).toString("base64");

      res.json({ token });
    }
  );
});

module.exports = router;