const Event = require("../models/Event");


// CREATE EVENT
const createEvent = async (req, res) => {

  try {

    const event = await Event.create(req.body);

    res.status(201).json(event);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL EVENTS
const getEvents = async (req, res) => {

  try {

    const events = await Event.find();

    res.status(200).json(events);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE EVENT
const getEventById = async (req, res) => {

  try {

    const event = await Event.findById(
      req.params.id
    );

    res.status(200).json(event);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE EVENT
const updateEvent = async (req, res) => {

  try {

    const updatedEvent =
      await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(updatedEvent);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE EVENT
const deleteEvent = async (req, res) => {

  try {

    await Event.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Event deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};