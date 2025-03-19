const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); 
require("dotenv").config();

// Import Routes
const studentRoutes = require("./routes/students");
const companyRoutes = require("./routes/companies");
const placementsRoutes = require("./routes/placements");
const recruitmentStatusRoutes = require("./routes/recruitmentStatus");

const app = express();
const PORT = process.env.PORT || 5001;

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

// Connect to MongoDB and Start the Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to start server due to database connection error:", err.message);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
