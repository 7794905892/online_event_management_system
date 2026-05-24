const Booking = require("../models/Booking");
const Event = require("../models/Event");


// CREATE BOOKING
const createBooking = async (req, res) => {
  try {

    const { eventId, tickets } = req.body;

    // Find event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Check seats
    if (event.availableSeats < tickets) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    // Calculate total
    const totalPrice = event.price * tickets;

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      event: eventId,
      tickets,
      totalPrice,
    });

    // Reduce seats
    event.availableSeats =
      event.availableSeats - tickets;

    await event.save();

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET USER BOOKINGS
const getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user.id,
    }).populate("event");

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// CANCEL BOOKING
const cancelBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Return seats
    const event = await Event.findById(
      booking.event
    );

    if (event) {
      event.availableSeats =
        event.availableSeats + booking.tickets;

      await event.save();
    }

    await booking.deleteOne();

    res.status(200).json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
};