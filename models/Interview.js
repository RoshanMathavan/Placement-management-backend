const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  schedule: { 
    type: Date, 
    required: true, 
    validate: {
      validator: (value) => value >= new Date(),
      message: "Schedule date must be in the future.",
    },
  },
});

module.exports = mongoose.model("Interview", InterviewSchema);
