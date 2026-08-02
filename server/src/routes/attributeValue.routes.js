import express from "express";

import {
  getAttributeValues,
  getAttributeValue,
  createAttributeValueController,
  updateAttributeValueController,
  deleteAttributeValueController,
} from "../controllers/attributeValue.controller.js";

const router = express.Router();

router.get("/", getAttributeValues);

router.get("/:id", getAttributeValue);

router.post("/", createAttributeValueController);

router.put("/:id", updateAttributeValueController);

router.delete("/:id", deleteAttributeValueController);

export default router;