import { useState } from "react";
import {
  FaClipboardList,
  FaSearch,
  FaEye,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";

import "./Bookings.css";

function Bookings() {
  // Sample booking data (we'll replace this with your backend later)
  const [bookings] = useState([
    {
      id: 1,
      student: "John Doe",
      hostel: "Michuki Hostel",
      room: "A101",
      status: "Pending",
    },
    {
      id: 2,
      student: "Jane Wanjiku",
      hostel: "Nyayo Hostel",
      room: "B203",
      status: "Approved",
    },
    {
      id: 3,
      student: "Peter Mwangi",
      hostel: "Main Hostel",
      room: "C104",
      status: "Rejected",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter((booking) =>
    booking.student.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h1>
          <FaClipboardList /> Bookings
        </h1>
      </div>

      <div className="search-container">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Hostel</th>
            <th>Room</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.student}</td>
              <td>{booking.hostel}</td>
              <td>{booking.room}</td>
              <td>{booking.status}</td>

              <td>
                <button className="view-btn">
                  <FaEye />
                </button>

                <button className="approve-btn">
                  <FaCheckCircle />
                </button>

                <button className="reject-btn">
                  <FaTimesCircle />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;