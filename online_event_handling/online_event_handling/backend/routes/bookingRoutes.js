const express = require("express");

const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE BOOKING
router.post("/", protect, createBooking);


// GET MY BOOKINGS
router.get("/my", protect, getMyBookings);


// CANCEL BOOKING
router.delete("/:id", protect, cancelBooking);

module.exports = router;