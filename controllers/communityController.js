import mongoose from "mongoose";
import Community from "../models/community/CommunitySchema.js";

export const createCommunity = async (req, res) => {
  const { name, description, tags, isPublic } = req.body;
  try {
    const newCommunity = new Community({
      name,
      description,
      tags,
      isPublic,
      createdBy: req.user.id,
    });
    await newCommunity.save();
    res.status(201).json(newCommunity);
  } catch (error) {
    console.log("[ERROR in createCommunity]", error);

    res.status(500).json({ message: "Error creating community" });
  }
};

export const getAllCommunities = async (req, res) => {
  const { sortBy } = req.query;

  try {
    let query = Community.find();

    // Apply sorting based on the `sortBy` parameter
    if (sortBy === "members") {
      // Sort by number of members (descending)
      query = query.sort({ members: -1 });
    } else if (sortBy === "createdAt") {
      // Sort by creation date (newest to oldest)
      query = query.sort({ createdAt: -1 });
    }

    // Fetch communities and populate creator details
    const communities = await query.populate(
      "createdBy",
      "name profileImage _id"
    );

    res.status(200).json({
      message: "Communities fetched successfully",
      data: communities,
    });
  } catch (error) {
    console.log("[ERROR in getAllCommunities]", error);

    res.status(500).json({
      message: "Error fetching communities",
      error: error.message, // Send only the error message for clarity
    });
  }
};

export const getSingleCommunity = async (req, res) => {
  const { communityId } = req.params;

  try {
    if (!mongoose.isValidObjectId(communityId)) {
      return res.status(400).json({
        message: "Invalid Community ID",
      });
    }

    const community = await Community.findById(communityId).populate(
      "createdBy",
      "name profileImage _id"
    );

    if (!community) {
      return res.status(404).json({
        message: "Community not found",
      });
    }

    res.status(200).json({
      message: "Community fetched successfully",
      data: community,
    });
  } catch (error) {
    console.log("[ERROR in getCommunityById]", error);
    res.status(500).json({
      message: "Error fetching community",
      error: error.message,
    });
  }
};
