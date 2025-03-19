const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
require("dotenv").config();

// Import Routes
const studentRoutes = require("./routes/students");
const companyRoutes = require("./routes/companies");
const placementsRoutes = require("./routes/placements");
const recruitmentStatusRoutes = require("./routes/recruitmentStatus");

const app = express();
const PORT = process.env.PORT || 5001;
const HTTPS_PORT = process.env.HTTPS_PORT || 5443;

// Proper CORS settings
app.use(cors({
  origin: "*",  // Allow all origins for development
  methods: "GET,POST,DELETE,PUT",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/placements", placementsRoutes);
app.use("/api/recruitment-status", recruitmentStatusRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the College Placement Management System API");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Connect to MongoDB and Start the Server
connectDB().then(() => {
  // Create HTTP server
  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log(`HTTP Server running on http://localhost:${PORT}`);
  });

  // Check if SSL certificates exist
  const certPath = path.join(__dirname, 'cert.pem');
  const keyPath = path.join(__dirname, 'key.pem');

  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    // SSL certificates exist, create HTTPS server
    const httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    };

    const httpsServer = https.createServer(httpsOptions, app);
    httpsServer.listen(HTTPS_PORT, () => {
      console.log(`HTTPS Server running on https://localhost:${HTTPS_PORT}`);
    });
  } else {
    console.log('SSL certificates not found. Run "node generate-cert.js" to generate them for HTTPS support.');
    console.log('Currently running in HTTP mode only.');
  }
}).catch((err) => {
  console.error("Failed to start server due to database connection error:", err.message);
});
