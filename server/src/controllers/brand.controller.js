import pool from "../config/db.js";
import fs from "fs";

// ===============================
// Get All Brands
// ===============================
export const getBrands = async (req, res) => {
  try {
    const [brands] = await pool.query(
      "SELECT * FROM brands ORDER BY id DESC"
    );

    res.json({
      success: true,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Single Brand
// ===============================
export const getBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const [brand] = await pool.query(
      "SELECT * FROM brands WHERE id=?",
      [id]
    );

    if (brand.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Brand Not Found",
      });
    }

    res.json({
      success: true,
      data: brand[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Create Brand
// ===============================
export const createBrand = async (req, res) => {
  try {
    const { name, slug, status } = req.body;

   const logo = req.file
  ? `/uploads/brands/${req.file.filename}`
  : null;

    const [result] = await pool.query(
      `INSERT INTO brands
      (name, slug, logo, status)
      VALUES (?, ?, ?, ?)`,
      [
        name,
        slug,
        logo,
        status ?? 1,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Brand Created Successfully",
      id: result.insertId,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Brand
// ===============================
export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, slug, status } = req.body;

    const [brand] = await pool.query(
      "SELECT * FROM brands WHERE id=?",
      [id]
    );

    if (brand.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Brand Not Found",
      });
    }

    let logo = brand[0].logo;

    if (req.file) {

      if (logo) {

        const oldPath = `public${logo}`;

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }

      }

      logo = `/uploads/${req.file.filename}`;
    }

    await pool.query(
      `UPDATE brands
       SET
       name=?,
       slug=?,
       logo=?,
       status=?
       WHERE id=?`,
      [
        name,
        slug,
        logo,
        status,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Brand Updated Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Delete Brand
// ===============================
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const [brand] = await pool.query(
      "SELECT * FROM brands WHERE id=?",
      [id]
    );

    if (brand.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Brand Not Found",
      });
    }

    if (brand[0].logo) {

      const oldPath = `public${brand[0].logo}`;

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

    }

    await pool.query(
      "DELETE FROM brands WHERE id=?",
      [id]
    );

    res.json({
      success: true,
      message: "Brand Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};