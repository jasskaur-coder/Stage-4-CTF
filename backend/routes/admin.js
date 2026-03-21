const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

router.get("/secret", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }

  res.json({
    message: "Insider leak confirmed.",
    flag: "FLAG{stage4_admin_escalation_success}"
  });
});

module.exports = router;