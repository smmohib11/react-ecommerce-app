import pool from "../config/db.js";

// ======================================
// Get All Users
// ======================================
export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        id,
        name,
        email,
        phone,
        city,
        role,
        status,
        created_at
      FROM users
      ORDER BY
        CASE role
          WHEN 'super_admin' THEN 1
          WHEN 'admin' THEN 2
          WHEN 'manager' THEN 3
          WHEN 'customer' THEN 4
          ELSE 5
        END,
        id DESC
    `);

    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ======================================
// Get Single User
// ======================================
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [user] = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        phone,
        address,
        city,
        image,
        role,
        status
      FROM users
      WHERE id=?
      `,
      [id]
    );

    if (!user.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Update User
// ======================================
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
      address,
      city,
      image,
      role,
      status,
    } = req.body;

    await pool.query(
      `
      UPDATE users
      SET
        name=?,
        email=?,
        phone=?,
        address=?,
        city=?,
        image=?,
        role=?,
        status=?
      WHERE id=?
      `,
      [
        name,
        email,
        phone,
        address,
        city,
        image || null,
        role,
        status,
        id,
      ]
    );

    res.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Delete User
// ======================================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM users WHERE id=?",
      [id]
    );

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Update Role & Status
// ======================================
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      role,
      status,
    } = req.body;

    await pool.query(
      `
      UPDATE users
      SET
        role=?,
        status=?
      WHERE id=?
      `,
      [
        role,
        status,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Role & Status updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Change User Role
export const changeRole = async (req, res) => {
    try {

        const { id } = req.params;
        const { role } = req.body;

        // database update query এখানে হবে

        res.json({
            success: true,
            message: "User role updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};