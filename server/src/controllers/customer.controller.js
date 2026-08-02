import pool from "../config/db.js";

// Get All Customers
export const getCustomers = async (req, res) => {
  try {

    const [customers] = await pool.query(`
      SELECT
        id,
        name,
        email,
        phone,
        address,
        city,
        status,
        created_at
      FROM users
      ORDER BY id DESC
    `);

    res.json({
      success: true,
      total: customers.length,
      data: customers,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Single Customer
export const getCustomer = async (req, res) => {
  try {

    const { id } = req.params;

    const [customer] = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        phone,
        address,
        city,
        status,
        created_at
      FROM users
      WHERE id = ?
      `,
      [id]
    );

    if (customer.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      data: customer[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Customer
export const updateCustomer = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      email,
      phone,
      address,
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
      status=?
      WHERE id=?
      `,
      [
        name,
        email,
        phone,
        address,
        status,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Customer updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Customer
export const deleteCustomer = async (req, res) => {
  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM users WHERE id=?",
      [id]
    );

    res.json({
      success: true,
      message: "Customer deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};