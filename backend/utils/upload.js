import multer from "multer";
import path from "path";
import fs from "fs"; // For file system operations
import cloudinary from "./cloudinary.js";

// Set up multer for temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp/"); // Save files temporarily in the "tmp" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

const upload = multer({ storage });

// Middleware to handle file upload and upload to Cloudinary
const uploadToCloudinary = async (req, res, next) => {
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images", // Optional: Organize images into folders
      });
      req.profileImageUrl = result.secure_url; // Attach the Cloudinary URL to the request object

      console.log("[req.profileImageUrl]", req.profileImageUrl);

      // Delete the temporary file
      fs.unlinkSync(req.file.path);
    }
    next(); // Proceed to the next middleware or controller
  } catch (err) {
    console.error("Error uploading file to Cloudinary:", err);
    res.status(500).json({ message: "Failed to upload file" });
  }
};

export { upload, uploadToCloudinary };
