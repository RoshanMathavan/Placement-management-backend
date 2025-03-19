const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("POST /api/students - Request Body:", req.body);

  const { name, email, resumeLink, course } = req.body;

  if (!name || !email || !resumeLink || !course) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Simulate saving the student
    res.status(201).json({ message: "Student added successfully." });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
