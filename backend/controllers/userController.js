import User from "../models/UserSchema.js";

export const getUserData = async (req, res) => {
  try {
    // req.user is set by the verifyToken middleware
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("[user]", user);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
