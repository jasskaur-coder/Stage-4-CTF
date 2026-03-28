const express = require("express");
const router = express.Router();
const ejs = require("ejs");

router.get("/", (req, res) => {
    const input = req.query.name || "Guest";

    // weak filter (intentional)
    if (input.includes("require")) {
        return res.send("Blocked");
    }

    const template = `<h1>Hello ${input}</h1>`;

    try {
        const output = ejs.render(template);
        res.send(output);
    } catch (err) {
        res.send("Template error");
    }
});

module.exports = router;