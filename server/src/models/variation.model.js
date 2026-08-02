import pool from "../config/db.js";

// ==========================
// Get Product Variations
// ==========================

export const getVariations = async (productId) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM product_variations
    WHERE product_id=?
    ORDER BY id ASC
    `,
    [productId]
  );

  return rows;
};

// ==========================
// Get Variation Values
// ==========================

export const getVariationValues = async (variationId) => {
  const [rows] = await pool.query(
    `
    SELECT
      pv.attribute_id,
      pv.attribute_value_id,
      a.name AS attribute,
      av.value
    FROM product_variation_values pv
    JOIN attributes a
      ON a.id=pv.attribute_id
    JOIN attribute_values av
      ON av.id=pv.attribute_value_id
    WHERE variation_id=?
    `,
    [variationId]
  );

  return rows;
};

// ==========================
// Create Variation
// ==========================

export const createVariation = async (data) => {
  const {
    product_id,
    sku,
    price,
    discount_price,
    stock,
    status,
  } = data;

  const [result] = await pool.query(
    `
    INSERT INTO product_variations
    (
      product_id,
      sku,
      price,
      discount_price,
      stock,
      status
    )
    VALUES (?,?,?,?,?,?)
    `,
    [
      product_id,
      sku,
      price,
      discount_price,
      stock,
      status,
    ]
  );

  return result.insertId;
};
// ==========================
// Insert Attribute Values
// ==========================

export const insertVariationValues = async (
  variationId,
  values
) => {

  for (const item of values) {

    await pool.query(
      `
      INSERT INTO product_variation_values
      (
        variation_id,
        attribute_id,
        attribute_value_id
      )
      VALUES (?,?,?)
      `,
      [
        variationId,
        item.attribute_id,
        item.attribute_value_id,
      ]
    );

  }

};
// ==========================
// Delete
// ==========================

export const deleteProductVariations = async (
  productId
) => {

  await pool.query(
    `
    DELETE FROM product_variations
    WHERE product_id=?
    `,
    [productId]
  );

};
//==========================    
    // Delete Variation
//==========================
export const deleteVariation = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM product_variations WHERE id=?",
    [id]
  );

  return result;
};
//==========================    
    // Create Variation Values
//==========================

// export const createVariation = async (data) => {

//     const [result] = await pool.query(
//         `
//         INSERT INTO product_variations
//         (
//             product_id,
//             sku,
//             price,
//             discount_price,
//             stock,
//             image,
//             status
//         )

//         VALUES(?,?,?,?,?,?,?)
//         `,
//         [
//             data.product_id,
//             data.sku,
//             data.price,
//             data.discount_price,
//             data.stock,
//             data.image,
//             data.status,
//         ]
//     );

//     return result.insertId;
// };