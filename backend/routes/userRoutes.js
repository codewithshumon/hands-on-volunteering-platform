import express from "express";

import { getSingleUser } from "../controllers/userController.js";
import verifyToken from "../controllers/authController.js";

const router = express.Router();

router.get("/single-user", verifyToken, getSingleUser);

export default router;
