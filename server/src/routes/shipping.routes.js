import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import { isSuperAdmin } from "../middleware/role.middleware.js";

import {

getShippingZones,
getShippingZone,
createShippingZone,
updateShippingZone,
deleteShippingZone

} from "../controllers/shipping.controller.js";

const router=express.Router();


// Public

router.get("/",getShippingZones);

router.get("/:id",getShippingZone);


// Admin

router.use(authenticate);
router.use(isSuperAdmin);

router.post("/",createShippingZone);

router.put("/:id",updateShippingZone);

router.delete("/:id",deleteShippingZone);

export default router;