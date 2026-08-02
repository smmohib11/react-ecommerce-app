import pool from "../config/db.js";

export const getDashboard = async (req, res) => {
  try {
    // ==========================
    // Overview
    // ==========================

    const [[products]] = await pool.query(
      "SELECT COUNT(*) total FROM products"
    );

    const [[categories]] = await pool.query(
      "SELECT COUNT(*) total FROM categories"
    );

    const [[customers]] = await pool.query(
      "SELECT COUNT(*) total FROM users"
    );

    const [[orders]] = await pool.query(
      "SELECT COUNT(*) total FROM orders"
    );

    const [[revenue]] = await pool.query(`
      SELECT
      IFNULL(SUM(total),0) total
      FROM orders
      WHERE order_status IN ('completed','delivered')
    `);

    // ==========================
    // Order Status
    // ==========================

    const [[pending]] = await pool.query(`
      SELECT COUNT(*) total
      FROM orders
      WHERE order_status='pending'
    `);

    const [[confirmed]] = await pool.query(`
      SELECT COUNT(*) total
      FROM orders
      WHERE order_status='confirmed'
    `);

    const [[processing]] = await pool.query(`
      SELECT COUNT(*) total
      FROM orders
      WHERE order_status='processing'
    `);

    const [[shipping]] = await pool.query(`
      SELECT COUNT(*) total
      FROM orders
      WHERE order_status='shipping'
    `);

    const [[completed]] = await pool.query(`
      SELECT COUNT(*) total
      FROM orders
      WHERE order_status IN ('completed','delivered')
    `);

    const [[cancelled]] = await pool.query(`
      SELECT COUNT(*) total
      FROM orders
      WHERE order_status='cancelled'
    `);

    // ==========================
    // Today
    // ==========================

    const [[todayOrders]] = await pool.query(`
      SELECT COUNT(*) total
      FROM orders
      WHERE DATE(created_at)=CURDATE()
    `);

    const [[todayRevenue]] = await pool.query(`
      SELECT
      IFNULL(SUM(total),0) total
      FROM orders
      WHERE DATE(created_at)=CURDATE()
      AND order_status IN ('completed','delivered')
    `);

    // ==========================
    // Recent Orders
    // ==========================

    const [recentOrders] = await pool.query(`
      SELECT
      id,
      order_number,
      customer_name,
      customer_phone,
      total,
      order_status,
      created_at
      FROM orders
      ORDER BY id DESC
      LIMIT 10
    `);

    // ==========================
    // Low Stock
    // ==========================

    const [lowStockProducts] = await pool.query(`
      SELECT
      id,
      name,
      stock,
      thumbnail
      FROM products
      WHERE stock<=5
      ORDER BY stock ASC
      LIMIT 10
    `);

    // ==========================
    // Latest Customers
    // ==========================

    const [latestCustomers] = await pool.query(`
      SELECT
      id,
      name,
      email,
      created_at
      FROM users
      ORDER BY id DESC
      LIMIT 10
    `);

    res.json({
      success: true,

      totalProducts: products.total,
      totalCategories: categories.total,
      totalCustomers: customers.total,
      totalOrders: orders.total,
      totalRevenue: revenue.total,

      pendingOrders: pending.total,
      confirmedOrders: confirmed.total,
      processingOrders: processing.total,
      shippingOrders: shipping.total,
      completedOrders: completed.total,
      cancelledOrders: cancelled.total,

      todayOrders: todayOrders.total,
      todayRevenue: todayRevenue.total,

      recentOrders,
      latestCustomers,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};