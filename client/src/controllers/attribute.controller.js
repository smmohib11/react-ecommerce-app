import {
  getAllAttributes,
  getAttributeById,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from "../models/attribute.model.js";

// =============================
// Get All
// =============================
export const getAttributes = async (req, res) => {
  try {
    const rows = await getAllAttributes();

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get One
// =============================
export const getAttribute = async (req, res) => {
  try {
    const row = await getAttributeById(req.params.id);

    if (!row) {
      return res.status(404).json({
        success: false,
        message: "Attribute not found",
      });
    }

    res.json({
      success: true,
      data: row,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Create
// =============================
export const createAttribute = async (req, res) => {
  try {
    await createAttribute(req.body);

    res.status(201).json({
      success: true,
      message: "Attribute Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Update
// =============================
export const updateAttribute = async (req, res) => {
  try {
    await updateAttribute(req.params.id, req.body);

    res.json({
      success: true,
      message: "Attribute Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Delete
// =============================
export const deleteAttribute = async (req, res) => {
  try {
    await deleteAttribute(req.params.id);

    res.json({
      success: true,
      message: "Attribute Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};