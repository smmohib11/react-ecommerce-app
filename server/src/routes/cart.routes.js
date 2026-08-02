import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
    addToCart,
    getCart,
    updateCart,
    deleteCart,
    clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addToCart);

router.get("/", getCart);

router.put("/:id", updateCart);

router.delete("/:id", deleteCart);

router.delete("/clear/all", clearCart);

export default router;