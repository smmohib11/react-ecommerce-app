import express from "express";

import authenticate from "../middleware/auth.middleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getProfile);

router.put("/", updateProfile);

router.put("/password", changePassword);

export default router;