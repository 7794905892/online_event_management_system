import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const cancelBooking = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/api/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking Cancelled");

      fetchBookings();

    } catch (error) {

      console.log(error);

      toast.error("Cancel Failed");
    }
  };

  return (

    <div className="dashboard">

      <h1>My Bookings</h1>

      <div className="booking-grid">

        {bookings.map((booking) => (

          <div
            className="booking-card"
            key={booking._id}
          >

            <h2>{booking.event.title}</h2>

            <p>
              Tickets: {booking.tickets}
            </p>

            <p>
              Total: ₹{booking.totalPrice}
            </p>

            <p>
              Status: {booking.status}
            </p>

            <button
              onClick={() =>
                cancelBooking(booking._id)
              }
            >
              Cancel Booking
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Dashboard;