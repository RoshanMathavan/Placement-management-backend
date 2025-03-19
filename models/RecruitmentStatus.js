const mongoose = require("mongoose");

const recruitmentStatusSchema = new mongoose.Schema(
  {
    studentsPlaced: {
      type: Number,
      required: [true, "Number of students placed is required"],
      min: [0, "Students placed cannot be negative"],
    },
    offersMade: {
      type: Number,
      required: [true, "Number of offers made is required"],
      min: [0, "Offers made cannot be negative"],
    },
    companiesParticipated: {
      type: Number,
      required: [true, "Number of companies participated is required"],
      min: [0, "Companies participated cannot be negative"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RecruitmentStatus", recruitmentStatusSchema);
