const SECRET = "investigation2026";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "No token provided" });

  try {
    // Remove "Bearer "
    const token = authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({ error: "Token missing" });

    const decoded = Buffer.from(token, "base64").toString();
    const [username, role, secret] = decoded.split(":");

    if (secret !== SECRET)
      return res.status(403).json({ error: "Invalid token" });

    req.user = { username, role };
    next();
  } catch {
    res.status(400).json({ error: "Malformed token" });
  }
}

module.exports = verifyToken;