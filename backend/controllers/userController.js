import User from "../models/UserSchema.js";

export const getSingleUser = async (req, res) => {
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

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by the verifyToken middleware
    const { name, profileImage, skills, causes } = req.body;

    // Find the user by ID and update their details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        profileImage,
        skills: skills?.split(",").map((skill) => skill.trim()),
        causes: causes?.split(",").map((cause) => cause.trim()),
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};
