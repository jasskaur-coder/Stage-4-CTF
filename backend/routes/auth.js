const express = require("express");
const router = express.Router();
const db = require("../db");

const SECRET = "investigation2026"; 

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";

  db.get(query, (err, user) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

 
    const token = Buffer.from(
      user.username + ":" + user.role + ":" + SECRET
    ).toString("base64");

    res.json({ token });
  });
});

module.exports = router;