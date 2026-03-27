const express = require("express");
const router = express.Router();
const db = require("../db");


// 🔥 EXISTING ROUTE (UNCHANGED - SQL Injection)
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


// 🔥 NEW ROUTE (FINAL STEP OF NEW CHAIN)
router.get("/data", (req, res) => {
  const key = req.query.key;

  console.log("Key received:", key); // debug log

  if (key === "dev_key") {
    return res.send("CSC{sl4v3_0f_th3_sh4d0w5}");
  }

  return res.status(403).send("Invalid key");
});


module.exports = router;