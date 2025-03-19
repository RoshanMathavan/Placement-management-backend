const Placement = require("../models/Placement");

// Fetch all placement drives
const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find();
    res.status(200).json({ success: true, data: placements });
  } catch (error) {
    console.error("Error fetching placements:", error);
    res.status(500).json({ message: "Error fetching placements", error: error.message });
  }
};

// Create a new placement drive
const createPlacement = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required!" });
    }

    const newPlacement = new Placement({ title, description });
    await newPlacement.save();
    
    res.status(201).json({ success: true, message: "Placement drive created successfully!", data: newPlacement });
  } catch (error) {
    console.error("Error creating placement drive:", error);
    res.status(500).json({ message: "Error creating placement drive", error: error.message });
  }
};

module.exports = { getPlacements, createPlacement };
