import express from "express";

import { createCommunity } from "../controllers/communityController";
import verifyToken from "../controllers/authController";

const router = express.Router();

// create community
router.post("/create", verifyToken, createCommunity);

export default router;
