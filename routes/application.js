const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// Fetch all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().populate("student company");
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching applications", error: error.message });
  }
});

// Create a new application
router.post("/", async (req, res) => {
  const { student, company, status } = req.body;
  if (!student || !company) {
    return res.status(400).json({ success: false, message: "Student and company are required!" });
  }
  try {
    const application = new Application({ student, company, status });
    await application.save();
    res.status(201).json({ success: true, message: "Application created successfully!", data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating application", error: error.message });
  }
});

// Update application status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, message: "Status is required!" });
  }
  try {
    const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    res.status(200).json({ success: true, message: "Application updated successfully!", data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating application", error: error.message });
  }
});

module.exports = router;
