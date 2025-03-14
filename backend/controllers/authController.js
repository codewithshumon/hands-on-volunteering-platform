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
    const verificationCodeExpiry = Date.now() + 3 * 60 * 1000; // 10 minutes

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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.emailVerificationCode !== code ||
      user.emailVerificationCodeExpires < Date.now()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

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

export const resendVerificationCode = async (req, res, next) => {
  try {
    const { email, purpose } = req.body; // Add `purpose` to the request body

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is verified (only for email verification, not password reset)
    if (purpose === "email-verification" && user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Ensure expired verification codes are reset
    const currentTime = Date.now();
    if (
      user.emailVerificationCodeExpires &&
      user.emailVerificationCodeExpires > currentTime
    ) {
      const remainingTime = user.emailVerificationCodeExpires - currentTime;
      return res.status(400).json({
        message: `Please wait ${Math.ceil(
          remainingTime / 1000
        )} seconds before requesting a new code`,
      });
    }

    // Generate a new verification code
    const verificationCode = generateVerificationCode();
    user.emailVerificationCode = verificationCode;
    user.emailVerificationCodeExpires = currentTime + 3 * 60 * 1000; // Expires in 3 minutes
    await user.save();

    // Send verification code via email
    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({
      status: "success",
      message: "New verification code sent",
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

    // Convert user to plain object and separate password
    const { password: userPassword, ...rest } = user.toObject();

    res.status(200).json({
      status: "success",
      token,
      data: rest,
    });
  } catch (err) {
    next(err);
  }
};

// middleware/verifyToken.js
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user ID to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;

// export const authenticate = async (req, res, next) => {
//   //get token from headers
//   const authToken = req.headers.authorization;

//   if (!authToken || !authToken.startsWith("Bearer ")) {
//     //if we do not use return here. get error Cannot set headers after they are sent
//     return res
//       .status(401)
//       .json({ success: false, message: "Authorization denied" });
//   }

//   try {
//     const token = authToken.split(" ")[1];

//     //verify token
//     const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);

//     req.userId = decoded.id;

//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token is expired" });
//     }

//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  let user;

  const patient = await User.findById(userId);

  if (patient) {
    user = patient;
  }

  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }

  next();
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email." });
    }

    // const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (err) {
    next(err);
  }
};
