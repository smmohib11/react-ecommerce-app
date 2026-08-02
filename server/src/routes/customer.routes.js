import express from "express";
import {
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", getCustomers);

router.get("/:id", getCustomer);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

export default router;