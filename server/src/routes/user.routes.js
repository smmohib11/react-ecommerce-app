import express from "express";

import authenticate from "../middleware/auth.middleware.js";

import {
    isSuperAdmin,
} from "../middleware/role.middleware.js";

import {
   getUsers,
    getUser,
    updateUser,
    deleteUser,
    changeRole,
    
} from "../controllers/user.controller.js";

const router = express.Router();

// All routes require login
router.use(authenticate);

// Only Super Admin
router.use(isSuperAdmin);

router.get("/", getUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.put("/:id/role", changeRole);



export default router;