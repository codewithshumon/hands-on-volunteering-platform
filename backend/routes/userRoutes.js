import express from "express";

import { getSingleUser, updateUser } from "../controllers/userController.js";
import verifyToken from "../controllers/authController.js";

const router = express.Router();

router.get("/single-user", verifyToken, getSingleUser);
router.put("/update-user", verifyToken, updateUser);

export default router;
