import pool from "../config/db.js";
import fs from "fs";
import path from "path";

export const createCategory = async (req, res) => {

    try {

        const { name } = req.body;

        const image = req.file
            ? req.file.filename
            : null;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        await pool.query(

            `
            INSERT INTO categories
            (name,image)

            VALUES
            (?,?)
            `,

            [
                name,
                image
            ]

        );

        res.status(201).json({

            success: true,
            message: "Category Created"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(`
      SELECT *
      FROM categories
      ORDER BY id DESC
    `);

    // Full image URL তৈরি
    const data = categories.map((category) => ({
      ...category,
      image: category.image
        ? `http://localhost:5000/uploads/categories/${category.image}`
        : null,
    }));

    res.json({
      success: true,
      total: data.length,
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Category
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const [categories] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const category = {
      ...categories[0],
      image: categories[0].image
        ? `http://localhost:5000/uploads/categories/${categories[0].image}`
        : null,
    };

    res.json({
      success: true,
      data: category,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
///Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Find category
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const category = rows[0];

    // Keep old image if no new image uploaded
    let image = category.image;

    // If new image uploaded
    if (req.file) {
      image = req.file.filename;

      // Delete old image
      if (category.image) {
        const imagePath = path.join(
          "src/uploads/categories",
          category.image
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }

    await pool.query(
      `
      UPDATE categories
      SET name = ?, image = ?
      WHERE id = ?
      `,
      [name, image, id]
    );

    res.json({
      success: true,
      message: "Category updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find category
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const category = rows[0];

    // Delete image if exists
    if (category.image) {
      const imagePath = path.join(
        "src/uploads/categories",
        category.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete from database
    await pool.query(
      "DELETE FROM categories WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};