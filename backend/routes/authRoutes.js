import express from "express";

import {
  login,
  resendVerificationCode,
  signup,
  verifyEmail,
} from "../controllers/authController.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Verify email route
router.post("/verify-email", verifyEmail);

// Login route
router.post("/login", login);

// Resend verification code route
router.post("/resend-verification-code", resendVerificationCode);

export default router;
