import pool from "../config/db.js";

// ===========================
// Get All Attributes
// ===========================
export const getAllAttributes = async () => {
  const [rows] = await pool.query(`
    SELECT *
    FROM attributes
    ORDER BY sort_order ASC, id DESC
  `);

  return rows;
};

// ===========================
// Get Single Attribute
// ===========================
export const getAttributeById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * FROM attributes WHERE id=?`,
    [id]
  );

  return rows[0];
};

// ===========================
// Create Attribute
// ===========================
export const createAttribute = async (data) => {
  const {
    name,
    slug,
    status,
    sort_order,
  } = data;

  const [result] = await pool.query(
    `
    INSERT INTO attributes
    (
      name,
      slug,
      status,
      sort_order
    )
    VALUES
    (
      ?,?,?,?
    )
    `,
    [
      name,
      slug,
      status,
      sort_order,
    ]
  );

  return result;
};

// ===========================
// Update Attribute
// ===========================
export const updateAttribute = async (id, data) => {
  const {
    name,
    slug,
    status,
    sort_order,
  } = data;

  const [result] = await pool.query(
    `
    UPDATE attributes
    SET

      name=?,
      slug=?,
      status=?,
      sort_order=?

    WHERE id=?
    `,
    [
      name,
      slug,
      status,
      sort_order,
      id,
    ]
  );

  return result;
};

// ===========================
// Delete Attribute
// ===========================
export const deleteAttribute = async (id) => {
  const [result] = await pool.query(
    `
    DELETE FROM attributes
    WHERE id=?
    `,
    [id]
  );

  return result;
};