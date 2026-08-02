import express from "express";
import upload from "../middleware/upload.middleware.js";
import {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller.js";

const router = express.Router();

router.get("/", getBrands);
router.get("/:id", getBrand);

router.post("/", upload.single("logo"), createBrand);

router.put("/:id", upload.single("logo"), updateBrand);

router.delete("/:id", deleteBrand);

export default router;