import express from "express";

import {

storeSpecifications,

indexSpecifications

}

from "../controllers/specification.controller.js";

const router=express.Router();

router.post("/",storeSpecifications);

router.get("/:productId",indexSpecifications);

export default router;