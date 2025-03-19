const express = require("express");
const { getRecruitmentStatus, createRecruitmentStatus, deleteRecruitmentStatus } = require("../controllers/recruitmentStatusController");

const router = express.Router();

// Define Routes
router.get("/", getRecruitmentStatus);
router.post("/", createRecruitmentStatus);
router.delete("/", deleteRecruitmentStatus);

module.exports = router;
