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


router.get("/logs", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }

  const logs = [
    "[INFO] System boot complete",
    "[DEBUG] Loading internal services...",
    "[DEBUG] environment: development",
    "[DEBUG] simple substitution encoding in use",
    "[DEBUG] meta pipeline state: zrgn:qvfnoyr",
    "[DEBUG] file reference: synt.gkg",
    "[WARN] Debug mode is active"
  ];

  res.json(logs);
});

module.exports = router;