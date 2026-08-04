import React, { useState, useEffect } from "react";

// Use live Render backend URL fallback
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [formData, setFormData] = useState({
    hostel_id: "",
    room_number: "",
    capacity: 2,
    price: 0,
  });

  useEffect(() => {
    fetchRooms();
    fetchHostels();
  }, []);

  // Retrieve room listings from Render
  const fetchRooms = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/rooms`);
      if (res.ok) {
        const data = await res.json();
        setRooms(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to load rooms:", err);
    }
  };

  // Retrieve hostel dropdown options from Render
  const fetchHostels = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/hostels`);
      if (res.ok) {
        const data = await res.json();
        setHostels(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to load hostels for selection:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to create room record");
      }

      setFormData({ hostel_id: "", room_number: "", capacity: 2, price: 0 });
      fetchRooms();
    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Rooms</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <h3>Add Room</h3>
        <select
          value={formData.hostel_id}
          onChange={(e) => setFormData({ ...formData, hostel_id: e.target.value })}
          required
        >
          <option value="">Select Hostel</option>
          {hostels.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Room Number"
          value={formData.room_number}
          onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <button type="submit">Add Room</button>
      </form>

      {/* Display active room records */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Hostel</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.room_number}</td>
              <td>{room.hostel}</td>
              <td>{room.capacity}</td>
              <td>{room.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rooms;