const Application = require("../models/application");

// Fetch all applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("student company");
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found." });
    }
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required!" });
  }

  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found." });
    }
    res.status(200).json({ message: "Application status updated!", data: updatedApplication });
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error: error.message });
  }
};

module.exports = { getApplications, updateApplicationStatus };
