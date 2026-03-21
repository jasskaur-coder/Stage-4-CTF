const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "database.db"));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      role TEXT,
      notes TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY,
      entry TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY,
      message TEXT
    )
  `);

  // 🔥 Seed Users (ONLY THIS BLOCK)
  db.run(`
    INSERT OR IGNORE INTO users (id, username, password, role, notes)
    VALUES
        (1, 'member', 'member123', 'member', 'Regular club member'),
        (2, 'admin', 'admin123', 'admin', 'Admin account locked. Access restricted.'),
        (3, 'system', 'system123', 'system', 'Internal token format: base64(username:role:investigation2026)')
  `);

  // Seed logs
  db.run(`
    INSERT OR IGNORE INTO logs VALUES
      (1, '[22:14] member accessed /admin?debug=true'),
      (2, '[22:12] role temporarily elevated'),
      (3, '[22:05] feedback payload rejected')
  `);

  // Seed feedback
  db.run(`
    INSERT OR IGNORE INTO feedback VALUES
      (1, 'Portal looks stable.'),
      (2, '<script>alert("test")</script>')
  `);
});

module.exports = db;
