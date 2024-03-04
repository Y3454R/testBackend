const express = require("express");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;

// Hardcoded JWT secret key
const JWT_SECRET = "my-jwt";

// Hardcoded user data
const hardcodedUser = {
  email: "test@mail.com",
  //   passwordHash: "$2a$10$EwITM6VQkXuUx4KQzeIe9OT0vDzPNjFvRvSkHJ5nDC5p.u4yqOKlO", // Hashed version of "pass123"
  password: "pass123",
};

app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello server!");
});

app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  if (hardcodedUser.email === email) {
    console.log("email milche");
  } else {
    console.log("email mile nai");
  }
  if (hardcodedUser.password === password) {
    console.log("pass milche");
  } else {
    console.log("pass mile nai");
  }
  if (hardcodedUser.email === email && hardcodedUser.password === password)
    res.status(200).json({ token: "ok" });
  else return res.status(401).json({ error: "invalid" });
});

// Route for handling login
app.post("/login", async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  try {
    // Check if email matches the hardcoded user
    if (email !== hardcodedUser.email) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password with the hashed password stored
    // const passwordMatch = await bcrypt.compare(
    //   password,
    //   hardcodedUser.passwordHash
    // );
    console.log(password);
    var passwordMatch = false;
    if (password === hardcodedUser.password) passwordMatch = true;
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // If credentials are correct, generate JWT token
    const token = jwt.sign({ email: hardcodedUser.email }, JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Return token
    console.log(token);
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
