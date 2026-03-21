const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/search", (req, res) => {
  const q = req.query.q;

  db.get(
    `SELECT * FROM logs WHERE entry LIKE '%${q}%'`,
    (err, row) => {
      if (row) {
        return res.json({ result: "Match found" });
      } else {
        return res.json({ result: "No match" });
      }
    }
  );
});

module.exports = router;