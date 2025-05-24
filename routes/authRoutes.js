import express from "express";

import {
  login,
  resendVerificationCode,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/authController.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Verify email route
router.post("/verify-email", verifyEmail);

// Resend verification code route
router.post("/resend-verification-code", resendVerificationCode);

router.post("/reset-password", resetPassword);

export default router;
