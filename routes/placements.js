const express = require("express");
const router = express.Router();
const {
  getPlacements,
  createPlacement,
} = require("../controllers/placementController");

// Route to fetch all placement drives
router.get("/", getPlacements);

// Route to create a new placement drive
router.post("/", createPlacement);

module.exports = router;
