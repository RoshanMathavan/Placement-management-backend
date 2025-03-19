const Company = require("../models/Company");

// Fetch all companies
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    if (!companies || companies.length === 0) {
      return res.status(404).json({ message: "No companies found." });
    }
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Error fetching companies", error: error.message });
  }
};

// Add a new company
const addCompany = async (req, res) => {
  const { name, jobPostings } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Company name is required!" });
  }

  if (!Array.isArray(jobPostings) || jobPostings.length === 0) {
    return res.status(400).json({ message: "Job Postings must be a non-empty array!" });
  }

  try {
    const newCompany = new Company({ name, jobPostings });
    await newCompany.save();
    res.status(201).json({ message: "Company added successfully!", data: newCompany });
  } catch (error) {
    console.error("Error adding company:", error);
    res.status(500).json({ message: "Error adding company", error: error.message });
  }
};

module.exports = { getCompanies, addCompany };
