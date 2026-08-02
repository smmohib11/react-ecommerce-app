import {
  getAllAttributeValues,
  getAttributeValueById,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
} from "../models/attributeValue.model.js";

// ====================================
// Get All
// ====================================
export const getAttributeValues = async (req, res) => {
  try {
    const data = await getAllAttributeValues();

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

// ====================================
// Get Single
// ====================================
export const getAttributeValue = async (req, res) => {
  try {
    const data = await getAttributeValueById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Attribute Value not found",
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

// ====================================
// Create
// ====================================
export const createAttributeValueController = async (
  req,
  res
) => {
  try {
    const result = await createAttributeValue(req.body);

    res.status(201).json({
      success: true,
      message: "Attribute Value created successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================================
// Update
// ====================================
export const updateAttributeValueController = async (
  req,
  res
) => {
  try {
    await updateAttributeValue(req.params.id, req.body);

    res.json({
      success: true,
      message: "Attribute Value updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================================
// Delete
// ====================================
export const deleteAttributeValueController = async (
  req,
  res
) => {
  try {
    await deleteAttributeValue(req.params.id);

    res.json({
      success: true,
      message: "Attribute Value deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};