const Student = require("../models/Student");

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
};

// Create a new student
const createStudent = async (req, res) => {
  const { name, email, rollNumber, department, resumeLink, course } = req.body;

  if (!name || !email || !rollNumber || !department || !resumeLink || !course) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newStudent = new Student({ name, email, rollNumber, department, resumeLink, course });
    await newStudent.save();
    res.status(201).json({ message: "Student created successfully", data: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error: error.message });
  }
};

module.exports = { getStudents, createStudent };
