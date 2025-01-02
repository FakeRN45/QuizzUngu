const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Username or email already exists." });
          }
          return res.status(500).json({ message: "Database error.", error: err });
        }
        res.status(201).json({ message: "User registered successfully." });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error hashing password.", error });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error.", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect username or password." });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

      res.json({
        message: "Login successful.",
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    }
  );
});

router.get("/profile", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    const userId = decoded.id;
    db.query("SELECT id, username, email FROM users WHERE id = ?", [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error.", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }

      res.json(results[0]);
    });
  });
});

module.exports = router;