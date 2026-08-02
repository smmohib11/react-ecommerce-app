import pool from "../config/db.js";

// =============================
// Get All Products
// =============================
export const getProducts = async () => {
  const [rows] = await pool.query(`
    SELECT
      p.*,
      c.name AS category_name,
      b.name AS brand_name
    FROM products p
    LEFT JOIN categories c
      ON c.id = p.category_id
    LEFT JOIN brands b
      ON b.id = p.brand_id
    ORDER BY p.id DESC
  `);

  return rows;
};

// =============================
// Get Single Product
// =============================
export const getProduct = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      p.*,
      c.name AS category_name,
      b.name AS brand_name
    FROM products p
    LEFT JOIN categories c
      ON c.id = p.category_id
    LEFT JOIN brands b
      ON b.id = p.brand_id
    WHERE p.id=?
    `,
    [id]
  );

  return rows[0];
};

// =============================
// Create Product
// =============================
export const createProduct = async (data) => {

  const [result] = await pool.query(

    `
    INSERT INTO products
    (
      category_id,
      brand_id,
      name,
      slug,
      sku,
      price,
      discount_price,
      stock,
      thumbnail,
      description,
      featured,
      status
    )

    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
    `,

    [
      data.category_id,
      data.brand_id,
      data.name,
      data.slug,
      data.sku,
      data.price,
      data.discount_price,
      data.stock,
      data.thumbnail,
      data.description,
      data.featured,
      data.status,
    ]

  );

  return result.insertId;
};

// =============================
// Update Product
// =============================
export const updateProduct = async (id, data) => {

  await pool.query(

    `
    UPDATE products
    SET

      category_id=?,
      brand_id=?,
      name=?,
      slug=?,
      sku=?,
      price=?,
      discount_price=?,
      stock=?,
      thumbnail=?,
      description=?,
      featured=?,
      status=?

    WHERE id=?
    `,

    [

      data.category_id,
      data.brand_id,
      data.name,
      data.slug,
      data.sku,
      data.price,
      data.discount_price,
      data.stock,
      data.thumbnail,
      data.description,
      data.featured,
      data.status,

      id

    ]

  );

  return true;
};

// =============================
// Delete Product
// =============================
export const deleteProduct = async (id) => {

  await pool.query(
    "DELETE FROM products WHERE id=?",
    [id]
  );

  return true;
};

// =============================
// Product Images
// =============================
export const getProductImages = async (productId) => {

  const [rows] = await pool.query(
    "SELECT * FROM product_images WHERE product_id=?",
    [productId]
  );

  return rows;
};

// =============================
// Add Product Image
// =============================
export const addProductImage = async (
  productId,
  image
) => {

  await pool.query(

    `
    INSERT INTO product_images
    (product_id,image)

    VALUES (?,?)
    `,

    [

      productId,
      image,

    ]

  );

};

// =============================
// Delete Product Images
// =============================
export const deleteProductImages = async (
  productId
) => {

  await pool.query(
    "DELETE FROM product_images WHERE product_id=?",
    [productId]
  );

};

// =============================
// Product Variations
// =============================
export const getProductVariations = async (
  productId
) => {

  const [rows] = await pool.query(
    "SELECT * FROM product_variations WHERE product_id=?",
    [productId]
  );

  return rows;
};

// =============================
// Product Specifications
// =============================
export const getProductSpecifications = async (
  productId
) => {

  const [rows] = await pool.query(
    "SELECT * FROM product_specifications WHERE product_id=?",
    [productId]
  );

  return rows;
};