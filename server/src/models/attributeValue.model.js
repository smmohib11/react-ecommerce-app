import pool from "../config/db.js";

// ==============================
// Get All Attribute Values
// ==============================
export const getAllAttributeValues = async () => {
  const [rows] = await pool.query(`
    SELECT
      av.*,
      a.name AS attribute_name
    FROM attribute_values av
    LEFT JOIN attributes a
      ON av.attribute_id = a.id
    ORDER BY
      a.sort_order ASC,
      av.sort_order ASC,
      av.id DESC
  `);

  return rows;
};

// ==============================
// Get Single Attribute Value
// ==============================
export const getAttributeValueById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM attribute_values
    WHERE id=?
    `,
    [id]
  );

  return rows[0];
};

// ==============================
// Create
// ==============================
export const createAttributeValue = async (data) => {
  const {
    attribute_id,
    value,
    slug,
    status,
    sort_order,
  } = data;

  const [result] = await pool.query(
    `
    INSERT INTO attribute_values
    (
      attribute_id,
      value,
      slug,
      status,
      sort_order
    )
    VALUES
    (
      ?,?,?,?,?
    )
    `,
    [
      attribute_id,
      value,
      slug,
      status,
      sort_order,
    ]
  );

  return result;
};

// ==============================
// Update
// ==============================
export const updateAttributeValue = async (
  id,
  data
) => {
  const {
    attribute_id,
    value,
    slug,
    status,
    sort_order,
  } = data;

  const [result] = await pool.query(
    `
    UPDATE attribute_values
    SET

      attribute_id=?,
      value=?,
      slug=?,
      status=?,
      sort_order=?

    WHERE id=?
    `,
    [
      attribute_id,
      value,
      slug,
      status,
      sort_order,
      id,
    ]
  );

  return result;
};

// ==============================
// Delete
// ==============================
export const deleteAttributeValue = async (
  id
) => {
  const [result] = await pool.query(
    `
    DELETE FROM attribute_values
    WHERE id=?
    `,
    [id]
  );

  return result;
};