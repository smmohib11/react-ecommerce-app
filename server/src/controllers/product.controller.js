import pool from "../config/db.js";
import fs from "fs";
import path from "path";
import {
  getProduct as getProductModel,
  getProductImages,
  getProductVariations,
  getProductSpecifications,
} from "../models/product.model.js";
export const createProduct = async (req, res) => {
  try {
    const {
      category_id,
      name,
      short_description,
      description,
      price,
      discount_price,
      sku,
      stock,
      featured,
      status,
    } = req.body;

    // Validation
    if (!category_id || !name || !price) {
      return res.status(400).json({
        success: false,
        message: "Category, Name and Price are required",
      });
    }

    // Check category exists
    const [category] = await pool.query(
      "SELECT id FROM categories WHERE id = ?",
      [category_id]
    );

    if (category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Thumbnail
    const thumbnail = req.files?.thumbnail
      ? req.files.thumbnail[0].filename
      : null;

    // Simple Slug
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    // Insert Product
    const [result] = await pool.query(
      `INSERT INTO products
      (
        category_id,
        name,
        slug,
        short_description,
        description,
        price,
        discount_price,
        sku,
        stock,
        thumbnail,
        featured,
        status
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        category_id,
        name,
        slug,
        short_description,
        description,
        price,
        discount_price,
        sku,
        stock,
        thumbnail,
        featured || 0,
        status || 1,
      ]
    );

    const productId = result.insertId;

    // Gallery Images
    if (req.files?.images) {
      for (const image of req.files.images) {
        await pool.query(
          "INSERT INTO product_images (product_id,image) VALUES (?,?)",
          [productId, image.filename]
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      productId,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      category,
      featured,
      status,
      sort,
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const offset = (page - 1) * limit;

    let baseSql = `
      FROM products p
      LEFT JOIN categories c
      ON p.category_id = c.id
      WHERE 1=1
    `;

    const values = [];

    // Search
    if (search) {
      baseSql += ` AND p.name LIKE ?`;
      values.push(`%${search}%`);
    }

    // Category Filter
    if (category) {
      baseSql += ` AND p.category_id = ?`;
      values.push(category);
    }

    // Featured Filter
    if (featured !== undefined) {
      baseSql += ` AND p.featured = ?`;
      values.push(featured);
    }

    // Status Filter
    if (status !== undefined) {
      baseSql += ` AND p.status = ?`;
      values.push(status);
    }

    // Total count (for correct pagination)
    const [countRows] = await pool.query(
      `SELECT COUNT(*) AS total ${baseSql}`,
      values
    );
    const total = countRows[0].total;

    // Sorting
    let sql = `SELECT p.*, c.name AS category_name ${baseSql}`;

    if (sort === "low-high") {
      sql += ` ORDER BY p.price ASC`;
    } else if (sort === "high-low") {
      sql += ` ORDER BY p.price DESC`;
    } else {
      sql += ` ORDER BY p.id DESC`;
    }

    sql += ` LIMIT ? OFFSET ?`;

    const listValues = [...values, limit, offset];

    const [products] = await pool.query(sql, listValues);

    const data = products.map((product) => ({
      ...product,
      thumbnail: product.thumbnail
        ? `http://localhost:5000/uploads/products/${product.thumbnail}`
        : null,
    }));

    res.json({
      success: true,
      page,
      limit,
      total,
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Product
export const getProduct = async (req, res) =>  {
  try {
    const { id } = req.params;

    const [products] = await pool.query(
      `
      SELECT
        p.*,
        c.name AS category_name
      FROM products p
      LEFT JOIN categories c
      ON p.category_id = c.id
      WHERE p.id = ?
      `,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const product = products[0];

    const [images] = await pool.query(
      "SELECT image FROM product_images WHERE product_id = ?",
      [id]
    );

    res.json({
      success: true,
      data: {
        ...product,
        thumbnail: product.thumbnail
          ? `http://localhost:5000/uploads/products/${product.thumbnail}`
          : null,
        images: images.map((img) => ({
          image: `http://localhost:5000/uploads/products/${img.image}`,
        })),
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [products] = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const product = products[0];

    // Fallback to existing values when a field isn't sent (partial update safe)
    const category_id = req.body.category_id ?? product.category_id;
    const name = req.body.name ?? product.name;
    const short_description = req.body.short_description ?? product.short_description;
    const description = req.body.description ?? product.description;
    const price = req.body.price ?? product.price;
    const discount_price = req.body.discount_price ?? product.discount_price;
    const sku = req.body.sku ?? product.sku;
    const stock = req.body.stock ?? product.stock;
    const featured = req.body.featured ?? product.featured;
    const status = req.body.status ?? product.status;

    let thumbnail = product.thumbnail;

    // New Thumbnail
    if (req.files?.thumbnail) {
      thumbnail = req.files.thumbnail[0].filename;

      if (product.thumbnail) {
        const oldImage = path.join(
          "src/uploads/products",
          product.thumbnail
        );

        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
      }
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    await pool.query(
      `
      UPDATE products SET

      category_id=?,
      name=?,
      slug=?,
      short_description=?,
      description=?,
      price=?,
      discount_price=?,
      sku=?,
      stock=?,
      thumbnail=?,
      featured=?,
      status=?

      WHERE id=?
      `,
      [
        category_id,
        name,
        slug,
        short_description,
        description,
        price,
        discount_price,
        sku,
        stock,
        thumbnail,
        featured,
        status,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Product Updated Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {

    const id = req.params.id;

    try {

        await db.query(
            "DELETE FROM product_images WHERE product_id=?",
            [id]
        );

        await db.query(
            "DELETE FROM product_specifications WHERE product_id=?",
            [id]
        );

        await db.query(
            "DELETE FROM product_variations WHERE product_id=?",
            [id]
        );

        await db.query(
            "DELETE FROM order_items WHERE product_id=?",
            [id]
        );

        await db.query(
            "DELETE FROM products WHERE id=?",
            [id]
        );

        res.json({
            success:true,
            message:"Deleted"
        });

    } catch(err){

        console.log(err);

        res.status(500).json(err);

    }

};

// Get Flash Sale Products
export const getFlashSaleProducts = async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT *
      FROM products
      WHERE flash_sale = 1
      AND status = 1
      AND flash_end > NOW()
      ORDER BY flash_end ASC
    `);

    res.json(products);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// export const deleteProduct = async (req, res) => {
//   const connection = await pool.getConnection();

//   try {
//     const { id } = req.params;

//     await connection.beginTransaction();

//     // Product
//     const [products] = await connection.query(
//       "SELECT * FROM products WHERE id = ?",
//       [id]
//     );

//     if (products.length === 0) {
//       await connection.rollback();

//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     const product = products[0];

//     // Delete thumbnail
//     if (product.thumbnail) {
//       const thumbPath = path.join(
//         "src/uploads/products",
//         product.thumbnail
//       );

//       if (fs.existsSync(thumbPath)) {
//         fs.unlinkSync(thumbPath);
//       }
//     }

//     // Gallery Images
//     const [gallery] = await connection.query(
//       "SELECT image FROM product_images WHERE product_id = ?",
//       [id]
//     );

//     for (const img of gallery) {
//       const imgPath = path.join(
//         "src/uploads/products",
//         img.image
//       );

//       if (fs.existsSync(imgPath)) {
//         fs.unlinkSync(imgPath);
//       }
//     }

//     // Delete gallery records
//     await connection.query(
//       "DELETE FROM product_images WHERE product_id=?",
//       [id]
//     );

//     // Delete product
//     await connection.query(
//       "DELETE FROM products WHERE id=?",
//       [id]
//     );

//     await connection.commit();

//     res.json({
//       success: true,
//       message: "Product deleted successfully",
//     });

//   } catch (error) {

//     await connection.rollback();

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   } finally {

//     connection.release();

//   }
// };

// ========================================
// Product Details
// ========================================

export const getProductDetails = async (req, res) => {

  try {

    const productId = req.params.id;

    const product = await getProductModel(productId);

    if (!product) {

      return res.status(404).json({

        success: false,
        message: "Product not found",

      });

    }

    const images =
      await getProductImages(productId);

    const variations =
      await getProductVariations(productId);

    const specifications =
      await getProductSpecifications(productId);

    res.json({

      success: true,

      data: {

        product,

        images,

        variations,

        specifications,

      },

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};