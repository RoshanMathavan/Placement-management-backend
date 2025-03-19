const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  status: { type: String, enum: ["submitted", "reviewed", "shortlisted", "rejected"], default: "submitted" },
  feedback: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Application || mongoose.model("Application", applicationSchema);
