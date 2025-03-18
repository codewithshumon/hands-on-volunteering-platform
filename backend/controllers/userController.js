import User from "../models/UserSchema.js";

export const getSingleUser = async (req, res) => {
  const userId = req.params.userId || req.user.id;

  try {
    // req.user is set by the verifyToken middleware
    const user = await User.findById(userId).select("-password");

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
    const userId = req.user.id;
    const profileImageUrl = req.profileImageUrl;

    // Extract fields from the request body
    const { name, skills, causes } = req.body;

    // Find the user by ID and update their details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name, // Use the extracted name
        profileImage: profileImageUrl, // Save the Cloudinary URL
        skills: skills?.split(",").map((skill) => skill.trim()), // Split and trim skills
        causes: causes?.split(",").map((cause) => cause.trim()), // Split and trim causes
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
