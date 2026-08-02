import express from "express";

import {
  getAttributes,
  getAttribute,
  createAttributeController,
  updateAttributeController,
  deleteAttributeController,
} from "../controllers/attribute.controller.js";

const router = express.Router();

router.get("/", getAttributes);

router.get("/:id", getAttribute);

router.post("/", createAttributeController);

router.put("/:id", updateAttributeController);

router.delete("/:id", deleteAttributeController);

export default router;