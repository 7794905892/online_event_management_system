const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

// Connect Database
connectDB();

// Initialize Express App
const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/bookings", bookingRoutes);


// Default Route
app.get("/", (req, res) => {
  res.send("Online Event Booking Backend Running");
});


// Port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});