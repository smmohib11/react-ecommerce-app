import express from "express";

import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";

import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", upload.single("image"), createCategory);

router.get("/", getCategories);

router.get("/:id", getCategory);

router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

export default router;