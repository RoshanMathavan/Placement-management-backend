const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5001;

// Connect to the database
connectDB();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://collegeplacmentmanagementsystem.netlify.app'], // Frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Required for cookies, if used
};
app.use(cors(corsOptions));

// Import Routes
const studentRoutes = require('./routes/students');
const companyRoutes = require('./routes/companies');
const placementRoutes = require('./routes/placements');
const recruitmentRoutes = require('./routes/recruitmentStatus');

// API Routes
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/recruitment-status', recruitmentRoutes);

// Serve frontend build files
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// Fallback for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(buildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
