const express = require("express");
const { scheduleInterview, getInterviews } = require("../controllers/interviewController");
const router = express.Router();

// Schedule a new interview
router.post("/", scheduleInterview);

// Get all interviews
router.get("/", getInterviews);

module.exports = router;
