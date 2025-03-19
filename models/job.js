const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    requirements: { 
      type: String, 
      default: "Not specified" 
    }, // Optional field
    salaryRange: { 
      type: String, 
      default: "Not disclosed" 
    }, // Optional field
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
