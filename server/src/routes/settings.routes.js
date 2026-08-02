import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import { isSuperAdmin } from "../middleware/role.middleware.js";

import upload from "../middleware/upload.middleware.js";

import {
  getSettings,
  updateSettings,
  updateLogo,
  updateFavicon,
} from "../controllers/settings.controller.js";

const router = express.Router();

// Public
router.get("/", getSettings);

// Only Admin
router.use(authenticate);
router.use(isSuperAdmin);

// Update Settings
router.put(
  "/",
  (req, res, next) => {
    console.log("1. Route reached");
    next();
  },

  authenticate,

  (req, res, next) => {
    console.log("2. Auth Passed");
    console.log(req.user);
    next();
  },

  isSuperAdmin,

  (req, res, next) => {
    console.log("3. Role Passed");
    next();
  },

  updateSettings
);
// Upload Logo
router.post(
  "/logo",
  upload.single("logo"),
  updateLogo
);

// Upload Favicon
router.post(
  "/favicon",
  upload.single("favicon"),
  updateFavicon
);

export default router;