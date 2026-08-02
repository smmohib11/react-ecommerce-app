import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

// ======================================
// Register
// ======================================
export const register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ==========================
    // Email already exists?
    // ==========================
    const [existingEmail] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ==========================
    // Phone already exists?
    // ==========================
    const [existingPhone] = await pool.query(
      "SELECT id FROM users WHERE phone = ?",
      [phone]
    );

    if (existingPhone.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists",
      });
    }

    // ==========================
    // Password Hash
    // ==========================
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `
      INSERT INTO users
      (
        name,
        phone,
        email,
        password,
        role,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        phone,
        email,
        hashedPassword,
        "customer",
        1,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Registration successful",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// // ======================================
// // Login
// // ======================================
// export const login = async (req, res) => {
//   console.log("Content-Type:", req.headers["content-type"]);
//   console.log("Body:", req.body);
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
//       email,
//     ]);

//     if (users.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const user = users[0];

//     if (Number(user.status) === 0) {
//       return res.status(403).json({
//         success: false,
//         message: "Your account has been disabled.",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     const token = generateToken(user);

//     ////generateToken
//     console.log("Generated Token:", token);

//     return res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         status: user.status,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// ======================================
// Login
// ======================================
// ======================================
// Login (Email or Phone)
// ======================================
export const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and password are required",
      });
    }

    const [users] = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = ? OR phone = ?
      LIMIT 1
      `,
      [login, login]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

    if (Number(user.status) === 0) {
      return res.status(403).json({
        success: false,
        message: "Your account has been disabled.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};