import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EventsAdmin = () => {

  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    availableSeats: "",
  });

  const token = localStorage.getItem("token");

  // Fetch Events
  const fetchEvents = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8000/api/events"
      );

      setEvents(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchEvents();

  }, []);

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Event
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8000/api/events",
        {
          ...formData,
          price: Number(formData.price),
          availableSeats: Number(formData.availableSeats),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Event Added Successfully");

      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        price: "",
        availableSeats: "",
      });

      fetchEvents();

    } catch (error) {

      console.log(error);

      toast.error("Failed to Add Event");
    }
  };

  // Delete Event
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8000/api/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Event Deleted");

      fetchEvents();

    } catch (error) {

      console.log(error);

      toast.error("Delete Failed");
    }
  };

  return (

    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >

      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Event Management
      </h2>

      {/* Add Event Form */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          marginBottom: "30px",
          background: "#fff",
        }}
      >

        <input
          type="text"
          name="title"
          placeholder="Enter Event Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Enter Event Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          style={inputStyle}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="location"
          placeholder="Enter Location"
          value={formData.location}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="price"
          placeholder="Enter Ticket Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="availableSeats"
          placeholder="Enter Available Seats"
          value={formData.availableSeats}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          Add Event
        </button>

      </form>

      {/* Events List */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >

        {events.map((event) => (

          <div
            key={event._id}
            style={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow:
                "0 0 10px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >

            <h3>{event.title}</h3>

            <p>
              📝 {event.description}
            </p>

            <p>
              📅 {new Date(event.date).toLocaleDateString()}
            </p>

            <p>
              📍 {event.location}
            </p>

            <p>
              💰 ₹{event.price}
            </p>

            <p>
              🎟️ Seats: {event.availableSeats}
            </p>

            <button
              onClick={() =>
                handleDelete(event._id)
              }
              style={{
                background: "red",
                color: "#fff",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%",
                marginTop: "10px",
              }}
            >
              Delete
            </button>

          </div>
        ))}

      </div>
    </div>
  );
};

// Styles

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "12px",
  background: "#764ba2",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

export default EventsAdmin;