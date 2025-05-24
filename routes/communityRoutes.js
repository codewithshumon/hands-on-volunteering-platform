import express from "express";

import {
  createCommunity,
  getAllCommunities,
  getSingleCommunity,
} from "../controllers/communityController.js";
import verifyToken from "../controllers/authController.js";

const router = express.Router();

// create community
router.post("/create-community", verifyToken, createCommunity);
router.get("/get-all-Communities", verifyToken, getAllCommunities);
router.get("/get-community/:communityId", verifyToken, getSingleCommunity);

export default router;
