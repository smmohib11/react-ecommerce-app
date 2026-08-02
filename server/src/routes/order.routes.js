import express from "express";

import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  updateOrderShipping,
  deleteOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.patch("/shipping/:id", updateOrderShipping);

router.put("/:id/status", updateOrderStatus);

router.get("/:id", getOrder);

router.delete("/:id", deleteOrder);

export default router;