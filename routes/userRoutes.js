import express from "express";

import {
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
import verifyToken from "../controllers/authController.js";
import { upload, uploadToCloudinary } from "../utils/upload.js";

const router = express.Router();

router.get("/get-all-user", verifyToken, getAllUser);
router.get("/single-user/:userId", verifyToken, getSingleUser);
router.put(
  "/update-user",
  verifyToken,
  upload.single("profileImage"),
  uploadToCloudinary,
  updateUser
);

export default router;
