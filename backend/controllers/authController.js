import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/UserSchema.js";
import { sendVerificationEmail } from "../utils/email.js";

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      emailVerificationCode: verificationCode, // Save to the correct field
      emailVerificationCodeExpires: verificationCodeExpiry, // Save to the correct field
    });

    console.log("[verificationCode]", verificationCode);

    // Send verification code via email
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      status: "success",
      message: "Verification code sent to email",
    });
  } catch (err) {
    next(err);
  }
};

// Verify Email Controller
export const verifyEmail = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if verification code matches and is not expired
    if (
      user.emailVerificationCode !== code ||
      user.emailVerificationCodeExpires < Date.now()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationCodeExpires = undefined;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Email verified successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Login Controller
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email and include the password field
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email first" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      token,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
// Resend Verification Code
export const resendVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const verificationCode = generateVerificationCode();
    user.verificationCode = verificationCode;
    user.verificationCodeExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    // TODO: Send new verification code via email
    console.log(`New verification code for ${email}: ${verificationCode}`);

    res.status(200).json({
      status: "success",
      message: "New verification code sent",
    });
  } catch (err) {
    next(err);
  }
};
