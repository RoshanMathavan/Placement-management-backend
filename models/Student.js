const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resumeLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.startsWith("http"),
      message: "Resume link must be a valid URL.",
    },
  },
  course: { type: String, required: true },
});

module.exports = mongoose.model("Student", StudentSchema);
