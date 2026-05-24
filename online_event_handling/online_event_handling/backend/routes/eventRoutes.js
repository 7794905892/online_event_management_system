const express = require("express");

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE EVENT
router.post("/", protect, createEvent);


// GET ALL EVENTS
router.get("/", getEvents);


// GET SINGLE EVENT
router.get("/:id", getEventById);


// UPDATE EVENT
router.put("/:id", protect, updateEvent);


// DELETE EVENT
router.delete("/:id", protect, deleteEvent);

module.exports = router;