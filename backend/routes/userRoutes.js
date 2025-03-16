import express from "express";

import { getSingleUser, updateUser } from "../controllers/userController.js";
import verifyToken from "../controllers/authController.js";
import { upload, uploadToCloudinary } from "../utils/upload.js";

const router = express.Router();

router.get("/single-user", verifyToken, getSingleUser);
router.put(
  "/update-user",
  verifyToken,
  upload.single("profileImage"),
  uploadToCloudinary,
  updateUser
);

export default router;
