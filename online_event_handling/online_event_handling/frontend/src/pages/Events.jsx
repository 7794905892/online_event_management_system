import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Events = () => {

  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8000/api/events"
      );

      // Add default ticket count
      const updatedEvents = res.data.map(
        (event) => ({
          ...event,
          tickets: 1,
        })
      );

      setEvents(updatedEvents);

    } catch (error) {

      console.log(error);
    }
  };

  const handleTicketChange = (id, value) => {

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === id
          ? { ...event, tickets: value }
          : event
      )
    );
  };

  const handleBooking = async (
    eventId,
    tickets
  ) => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      await axios.post(
        "http://localhost:8000/api/bookings",
        {
          eventId,
          tickets,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking Successful");

      fetchEvents();

    } catch (error) {

      console.log(error);

      toast.error("Booking Failed");
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="events-container">

      <h1>Available Events</h1>

      <input
        type="text"
        placeholder="Search Events..."
        className="search-box"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="events-grid">

        {filteredEvents.map((event) => (

          <div
            className="event-card"
            key={event._id}
          >

            <h2>{event.title}</h2>

            <p>{event.description}</p>

            <p>Date: {event.date}</p>

            <p>Location: {event.location}</p>

            <p>Price: ₹{event.price}</p>

            <p>
              Seats Left:
              {" "}
              {event.availableSeats}
            </p>

            <input
              type="number"
              min="1"
              max={event.availableSeats}
              value={event.tickets}
              onChange={(e) =>
                handleTicketChange(
                  event._id,
                  e.target.value
                )
              }
            />

            <button
              onClick={() =>
                handleBooking(
                  event._id,
                  event.tickets
                )
              }
            >
              Book Now
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Events;