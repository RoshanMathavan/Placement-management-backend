const express = require("express");
const { getCompanies, addCompany } = require("../controllers/companyController");
const router = express.Router();

// Fetch all companies
router.get("/", getCompanies);

// Add a new company
router.post("/", addCompany);

module.exports = router;
