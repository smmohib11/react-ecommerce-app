import {
  getAllAttributes,
  getAttributeById,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from "../models/attribute.model.js";

// ==============================
// Get All
// ==============================
export const getAttributes = async (req, res) => {
  try {
    const data = await getAllAttributes();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Single
// ==============================
export const getAttribute = async (req, res) => {
  try {
    const data = await getAttributeById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Attribute not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Create
// ==============================
export const createAttributeController = async (req, res) => {
  try {
    const result = await createAttribute(req.body);

    res.status(201).json({
      success: true,
      message: "Attribute created successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update
// ==============================
export const updateAttributeController = async (req, res) => {
  try {
    await updateAttribute(req.params.id, req.body);

    res.json({
      success: true,
      message: "Attribute updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete
// ==============================
export const deleteAttributeController = async (req, res) => {
  try {
    await deleteAttribute(req.params.id);

    res.json({
      success: true,
      message: "Attribute deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};