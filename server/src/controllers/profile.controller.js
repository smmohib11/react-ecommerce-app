import bcrypt from "bcrypt";
import pool from "../config/db.js";

// ===================================
// Get Profile
// ===================================

export const getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
      id,
      name,
      email,
      phone,
      address,
      city,
      role,
      status,
      created_at
      FROM users
      WHERE id=?
      `,
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===================================
// Update Profile
// ===================================

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address, city } = req.body;

    await pool.query(
      `
      UPDATE users
      SET
      name=?,
      email=?,
      phone=?,
      address=?,
      city=?
      WHERE id=?
      `,
      [
        name,
        email,
        phone,
        address,
        city,
        req.user.id,
      ]
    );

    res.json({
      success: true,
      message: "Profile Updated Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===================================
// Change Password
// ===================================

export const changePassword = async (req, res) => {
  try {
    const {
      current_password,
      new_password,
    } = req.body;

    const [rows] = await pool.query(
      `
      SELECT password
      FROM users
      WHERE id=?
      `,
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = rows[0];

    const matched = await bcrypt.compare(
      current_password,
      user.password
    );

    if (!matched) {
      return res.status(400).json({
        success: false,
        message: "Current password incorrect",
      });
    }

    const hash = await bcrypt.hash(new_password, 10);

    await pool.query(
      `
      UPDATE users
      SET password=?
      WHERE id=?
      `,
      [hash, req.user.id]
    );

    res.json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};