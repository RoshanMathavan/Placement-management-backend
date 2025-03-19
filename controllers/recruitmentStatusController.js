const RecruitmentStatus = require("../models/RecruitmentStatus");

// Get Latest Recruitment Status
exports.getRecruitmentStatus = async (req, res) => {
  try {
    const status = await RecruitmentStatus.find().sort({ createdAt: -1 }).limit(1); // Get latest
    if (!status.length) {
      return res.status(404).json({ message: "No recruitment status found" });
    }
    res.status(200).json({ success: true, data: status[0] });
  } catch (error) {
    console.error("Error fetching recruitment status:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Create Recruitment Status
exports.createRecruitmentStatus = async (req, res) => {
  try {
    const { studentsPlaced, offersMade, companiesParticipated } = req.body;

    if (!studentsPlaced || !offersMade || !companiesParticipated) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newStatus = new RecruitmentStatus({ studentsPlaced, offersMade, companiesParticipated });
    await newStatus.save();

    res.status(201).json({
      success: true,
      message: "Recruitment status created successfully!",
      data: newStatus,
    });
  } catch (error) {
    console.error("Error creating recruitment status:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete All Recruitment Status Entries (Fixed)
exports.deleteRecruitmentStatus = async (req, res) => {
  try {
    await RecruitmentStatus.deleteMany({}); // Deletes all entries
    res.status(200).json({ success: true, message: "All recruitment statuses deleted successfully" });
  } catch (error) {
    console.error("Error deleting recruitment status:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
