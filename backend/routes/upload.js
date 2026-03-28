const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const upload = multer({ dest: uploadPath });

router.post("/", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.send("No file uploaded");

    if (!file.originalname.endsWith(".png")) {
      return res.send("Only PNG allowed");
    }

    const buffer = fs.readFileSync(file.path);
    const content = buffer.toString("latin1");

    
    if (!buffer.toString("hex").startsWith("89504e47")) {
      return res.send("Invalid PNG file");
    }

    
    if (content.includes("QWxhZGRpbjpvcGVuIHNlc2FtZQ==")) {
      return res.send("Image processed successfully");
    }

    
    const bypass = content.includes("meta:enable");

    
    if (content.includes("meta:disable") && content.includes("flag.txt")) {
      return res.send("FLAG{almost_there_keep_trying}");
    }

    
    if (bypass && content.includes("flag.txt")) {
      return res.send("NITJ{gh0st_1n_th3_1m4g3}");
    }

    
    if (!bypass && (content.includes("flag") || content.includes("txt"))) {
      return res.send("Suspicious file detected");
    }

    return res.send("Avatar updated successfully");

  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

module.exports = router;