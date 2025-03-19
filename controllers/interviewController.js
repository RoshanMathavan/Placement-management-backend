const Interview = require('../models/Interview');

// Schedule an interview
const scheduleInterview = async (req, res) => {
  const { student, company, date, mode } = req.body;

  if (!student || !company || !date || !mode) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const interview = new Interview({ student, company, date, mode });
    await interview.save();
    res.status(201).json({ message: 'Interview scheduled successfully!', data: interview });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling interview', error: error.message });
  }
};

// Get all interviews
const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().populate('student company');
    res.status(200).json({ success: true, data: interviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interviews', error: error.message });
  }
};

module.exports = { scheduleInterview, getInterviews };
