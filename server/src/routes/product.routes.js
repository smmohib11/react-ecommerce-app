import express from "express";
import upload from "../middleware/upload.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getFlashSaleProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

// Public
router.get("/", getProducts);

router.get("/flash-sale", getFlashSaleProducts);

router.get("/details/:id", getProductDetails);

router.get("/:id", getProduct);

// Protected
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateProduct
);

router.delete("/:id", authMiddleware, deleteProduct);

export default router;