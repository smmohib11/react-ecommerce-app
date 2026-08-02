import express from "express";

import {
  getProductVariations,
  createProductVariation,
  removeVariation,
  generateVariations,
  saveVariations,
} from "../controllers/variation.controller.js";

const router = express.Router();

// Generate combinations
router.post("/generate", generateVariations);

// Save all generated variations
router.post("/save", saveVariations);

// Get all variations of a product
router.get("/product/:productId", getProductVariations);

// Create single variation
router.post("/", createProductVariation);

// Delete variation
router.delete("/:id", removeVariation);

export default router;
