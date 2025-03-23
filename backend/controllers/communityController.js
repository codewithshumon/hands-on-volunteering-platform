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
  try {
    // Fetch communities based on the query
    const communities = await Community.find().populate(
      "createdBy",
      "name profileImage _id"
    ); // Populate creator details

    res.status(200).json({
      message: "Events fetched successfully",
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
