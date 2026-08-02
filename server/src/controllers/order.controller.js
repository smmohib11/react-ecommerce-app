import pool from "../config/db.js";

export const createOrder = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      user_id,
      customer_name,
      customer_phone,
      shipping_address,
      payment_method,
      shipping_cost = 0,
      notes,
      items,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    let subtotal = 0;
    const orderItems = [];

    // Calculate subtotal & validate stock
    for (const item of items) {
      const [products] = await connection.query(
        "SELECT * FROM products WHERE id = ?",
        [item.product_id]
      );

      if (products.length === 0) {
        throw new Error(`Product ID ${item.product_id} not found`);
      }

      const product = products[0];

      if (product.stock < item.quantity) {
        throw new Error(`${product.name} stock not available`);
      }

      const total = Number(product.price) * Number(item.quantity);

      subtotal += total;

      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        quantity: item.quantity,
        price: product.price,
        total,
      });
    }

    const totalAmount = subtotal + Number(shipping_cost);

    const orderNumber = "ORD" + Date.now();

    // Insert Order
   const [orderResult] = await connection.query(
  `INSERT INTO orders
  (
    order_number,
    user_id,
    customer_name,
    customer_phone,
    shipping_address,
    subtotal,
    shipping_cost,
    total,
    payment_method,
    payment_status,
    order_status,
    notes
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    orderNumber,
    user_id ?? null,
    customer_name,
    customer_phone,
    shipping_address,
    subtotal,
    shipping_cost,
    totalAmount,
    payment_method,
    "pending",
    "pending",
    notes ?? null,
  ]
);

    const orderId = orderResult.insertId;

    // Insert Order Items & Update Stock
    for (const item of orderItems) {
      await connection.query(
        `INSERT INTO order_items
        (
          order_id,
          product_id,
          product_name,
          quantity,
          price,
          total
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.product_id,
          item.product_name,
          item.quantity,
          item.price,
          item.total,
        ]
      );

      await connection.query(
        `UPDATE products
         SET stock = stock - ?
         WHERE id = ?`,
        [item.quantity, item.product_id]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order_id: orderId,
      order_number: orderNumber,
    });

  } catch (error) {
    await connection.rollback();

    res.status(500).json({
      success: false,
      message: error.message,
    });

  } finally {
    connection.release();
  }
};

export const getOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT
        o.*,
        u.name AS user_name
      FROM orders o
      LEFT JOIN users u
      ON o.user_id = u.id
      ORDER BY o.id DESC
    `);

    res.json({
      success: true,
      total: orders.length,
      data: orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getOrder = async (req, res) => {

  try {

    const { id } = req.params;

    const [orders] = await pool.query(
      "SELECT * FROM orders WHERE id=?",
      [id]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const order = orders[0];

    const [items] = await pool.query(
      "SELECT * FROM order_items WHERE order_id=?",
      [id]
    );

    order.items = items;

    res.json({
      success: true,
      data: order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const updateOrderStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const { order_status } = req.body;

    await pool.query(
      `
      UPDATE orders
      SET order_status=?
      WHERE id=?
      `,
      [order_status, id]
    );

    res.json({
      success: true,
      message: "Order status updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ===========================
// Update Delivery / Shipping Charge
// ===========================

export const updateOrderShipping = async (req, res) => {

  try {

    const { id } = req.params;

    const { shipping_cost } = req.body;

    if (
      shipping_cost === undefined ||
      shipping_cost === null ||
      isNaN(shipping_cost) ||
      Number(shipping_cost) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid shipping_cost is required",
      });
    }

    const [orders] = await pool.query(
      "SELECT subtotal FROM orders WHERE id=?",
      [id]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const subtotal = Number(orders[0].subtotal);
    const newTotal = subtotal + Number(shipping_cost);

    await pool.query(
      `
      UPDATE orders
      SET shipping_cost=?, total=?
      WHERE id=?
      `,
      [shipping_cost, newTotal, id]
    );

    res.json({
      success: true,
      message: "Delivery charge updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const deleteOrder = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM orders WHERE id=?",
      [id]
    );

    res.json({
      success: true,
      message: "Order deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};