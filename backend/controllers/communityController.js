import mongoose from "mongoose";

import User from "../models/UserSchema.js";
import Community from "../models/community/CommunitySchema.js";

export const createCommunity = async (req, res) => {
  const { name, description, tags, isPublic } = req.body;
  try {
    const newCommunity = new Community({
      name,
      description,
      tags,
      isPublic,
      createdBy: req.user._id,
    });
    await newCommunity.save();
    res.status(201).json(newCommunity);
  } catch (error) {
    res.status(500).json({ message: "Error creating community" });
  }
};
